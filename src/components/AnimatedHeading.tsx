import React from 'react';
import TextEngine from 'spring-text-engine';

const MYANMAR_SCRIPT_RE = /[\u1000-\u109F\uAA60-\uAA7F\uA9E0-\uA9FF]/;
const MYANMAR_CLUSTER_RE =
  /(?:\u1004\u103A\u1039)?[\u1000-\u102A\u103F-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u109E\u109F](?:\u1039[\u1000-\u102A\u103F-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u109E\u109F]|[\u102B-\u103E\u1056-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u200C\u200D\uFE00-\uFE0F])*|./gu;
const MYANMAR_DEPENDENT_MARK_START_RE =
  /^[\u102B-\u103E\u1056-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u200C\u200D\uFE00-\uFE0F]/;

export function splitGraphemeSafeChars(input: string): string[] {
  if (!MYANMAR_SCRIPT_RE.test(input)) {
    return Array.from(input);
  }
  const rawClusters = input.match(MYANMAR_CLUSTER_RE) || [];
  const merged: string[] = [];
  for (const cluster of rawClusters) {
    if (merged.length > 0 && MYANMAR_DEPENDENT_MARK_START_RE.test(cluster)) {
      merged[merged.length - 1] += cluster;
    } else {
      merged.push(cluster);
    }
  }
  return merged;
}

const PATCH_SYMBOL = Symbol.for('tbstar.myanmarClusterSplitPatched');
const globalScope = globalThis as Record<symbol, boolean>;

if (!globalScope[PATCH_SYMBOL]) {
  globalScope[PATCH_SYMBOL] = true;
  const nativeSplit = String.prototype.split;
  // Ensure spring-text-engine's internal word.split("") preserves Myanmar orthographic syllable clusters
  // while leaving ASCII/English character splitting identical to native behavior.
  // eslint-disable-next-line no-extend-native
  String.prototype.split = function splitWithMyanmarClusters(
    separator?: string | RegExp | { [Symbol.split](string: string, limit?: number): string[] },
    limit?: number
  ): string[] {
    if (separator === '' && limit === undefined) {
      const str = String(this);
      if (MYANMAR_SCRIPT_RE.test(str)) {
        return splitGraphemeSafeChars(str);
      }
    }
    return nativeSplit.call(this, separator as never, limit);
  };
}

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface AnimatedHeadingProps extends React.HTMLAttributes<HTMLElement> {
  tag: HeadingTag;
  children: React.ReactNode;
}

const LETTER_OUT = { opacity: 0, y: 24 };
const LETTER_IN = { opacity: 1, y: 0 };
const LETTER_CONFIG = { tension: 220, friction: 22 };

function extractTextKey(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractTextKey).join('');
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return extractTextKey(node.props.children);
  }
  return '';
}

function resolveHeadingClassName(className = ''): string {
  const hasJustify = /\bjustify-(start|center|end|between|around|evenly)\b/.test(className);
  if (hasJustify) {
    return className;
  }
  if (/\btext-center\b/.test(className)) {
    return `${className} justify-center`.trim();
  }
  if (/\btext-right\b/.test(className)) {
    return `${className} justify-end`.trim();
  }
  return `${className} justify-start`.trim();
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  tag,
  className = '',
  style,
  children,
  ...rest
}) => {
  const contentKey = `${tag}:${extractTextKey(children)}`;
  const resolvedClassName = resolveHeadingClassName(className);

  return (
    <TextEngine
      key={contentKey}
      tag={tag}
      mode="once"
      overflow
      letterOut={LETTER_OUT}
      letterIn={LETTER_IN}
      letterConfig={LETTER_CONFIG}
      letterStagger={30}
      className={resolvedClassName}
      style={style}
      {...rest}
    >
      {children}
    </TextEngine>
  );
};

export default AnimatedHeading;
