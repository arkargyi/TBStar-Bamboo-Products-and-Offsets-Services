import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Phone,
  Copy,
  Check,
  FileText,
  CheckCircle2,
  Mail,
  MessageCircle,
  AlertTriangle,
} from 'lucide-react';
import {
  COMPANY_INFO,
  INQUIRY_TYPE_OPTIONS,
  InquiryTypeOption,
} from '../constants/companyData';
import { Button, ErrorMessage } from './SharedUI';
import { INQUIRY_TYPE_LABELS, useLanguage } from '../context/LanguageContext';

export type { InquiryTypeOption };
export { INQUIRY_TYPE_OPTIONS };

interface InquiryApiResponse {
  ok: boolean;
  inquiryId?: string;
  delivered?: boolean;
  storedOnServer?: boolean;
  deliveryChannel?: 'smtp' | 'resend' | 'webhook' | 'server_log_only';
  notice?: string;
  error?: string;
}

interface ContactFormProps {
  selectedInquiryType: InquiryTypeOption;
  onSelectInquiryType?: (type: InquiryTypeOption) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  selectedInquiryType,
  onSelectInquiryType,
  onClose,
  isModal = false,
}) => {
  const { isMm, t } = useLanguage();
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<InquiryTypeOption>(selectedInquiryType);
  const [message, setMessage] = useState('');
  // Honeypot anti-spam field (must remain empty for legitimate users)
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');
  const formRenderedAtRef = useRef<number>(Date.now());

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);
  const [deliveryState, setDeliveryState] = useState<{
    inquiryId: string;
    delivered: boolean;
    deliveryChannel: string;
    notice?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setInquiryType(selectedInquiryType);
  }, [selectedInquiryType]);

  const handleCategoryChange = (value: InquiryTypeOption) => {
    setInquiryType(value);
    if (onSelectInquiryType) {
      onSelectInquiryType(value);
    }
  };

  const validateAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage(
        t('Please enter your Full Name (at least 2 characters).', 'သင်၏ အမည်အပြည့်အစုံကို ထည့်သွင်းပေးပါ။')
      );
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setErrorMessage(
        t('Please enter a valid Email Address.', 'မှန်ကန်သော အီးမေးလ်လိပ်စာ ထည့်သွင်းပေးပါ။')
      );
      return;
    }
    const phonePattern = /^[0-9+\-\s()]{6,25}$/;
    if (!phonePattern.test(phone.trim())) {
      setErrorMessage(
        t('Please enter a valid Phone Number.', 'မှန်ကန်သော ဖုန်းနံပါတ် ထည့်သွင်းပေးပါ။')
      );
      return;
    }
    if (message.trim().length < 10) {
      setErrorMessage(
        t(
          'Please enter a Message describing your product or printing inquiry (at least 10 characters).',
          'မေးမြန်းလိုသော အကြောင်းအရာကို အနည်းဆုံး စာလုံးရေ ၁၀ လုံး ရေးသားပေးပါ။'
        )
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          fullName: name.trim(),
          companyName: companyName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          inquiryType,
          message: message.trim(),
          website: websiteHoneypot,
          formRenderedAt: formRenderedAtRef.current,
        }),
      });

      const data = (await response.json().catch(() => null)) as InquiryApiResponse | null;

      if (!response.ok || !data || !data.ok) {
        const serverErr =
          data?.error ||
          t(
            'Unable to submit your inquiry right now. Please try again or contact our Yangon office directly by phone or email.',
            'ယခုအချိန်တွင် မေးမြန်းလွှာ ပေးပို့၍ မရနိုင်သေးပါ။ ခေတ္တစောင့်ဆိုင်းပြီး ထပ်မံကြိုးစားပါ သို့မဟုတ် ရန်ကုန်ရုံးချုပ်ဖုန်းသို့ တိုက်ရိုက်ဆက်သွယ်ပါ။'
          );
        setErrorMessage(serverErr);
        setIsSubmitting(false);
        return;
      }

      const label = isMm
        ? INQUIRY_TYPE_LABELS[inquiryType].mm
        : INQUIRY_TYPE_LABELS[inquiryType].en;
      const summaryText = [
        `INQUIRY REFERENCE: ${data.inquiryId || 'N/A'}`,
        `INQUIRY FOR: ${COMPANY_INFO.name}`,
        `Inquiry Type: ${label}`,
        `Full Name: ${name.trim()}`,
        `Company Name: ${companyName.trim() || 'Not specified'}`,
        `Email Address: ${email.trim()}`,
        `Phone Number: ${phone.trim()}`,
        `Message / Specifications:`,
        message.trim(),
      ].join('\n');

      setDeliveryState({
        inquiryId: data.inquiryId || 'TBS-INQUIRY',
        delivered: Boolean(data.delivered),
        deliveryChannel: data.deliveryChannel || 'server_log_only',
        notice: data.notice,
      });
      setSubmittedSummary(summaryText);
    } catch {
      setErrorMessage(
        t(
          `Network error while connecting to the inquiry server. Please contact us directly at ${COMPANY_INFO.telephone} or ${COMPANY_INFO.email}.`,
          `အင်တာနက်ချိတ်ဆက်မှု အခက်အခဲရှိနေပါသည်။ ဖုန်း ${COMPANY_INFO.telephone} သို့မဟုတ် ${COMPANY_INFO.email} သို့ တိုက်ရိုက် ဆက်သွယ်နိုင်ပါသည်။`
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    if (!submittedSummary) return;
    try {
      await navigator.clipboard.writeText(submittedSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const prefix = isModal ? 'modal' : 'page';

  if (submittedSummary && deliveryState) {
    const mailtoSubject = encodeURIComponent(
      `[${deliveryState.inquiryId}] ${inquiryType} Inquiry – ${name.trim()}`
    );
    const mailtoBody = encodeURIComponent(submittedSummary);
    const directMailtoHref = `mailto:${COMPANY_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    const directWhatsAppHref = `${COMPANY_INFO.whatsappHref}?text=${encodeURIComponent(
      submittedSummary
    )}`;

    return (
      <div className="bg-white border border-[#DDE5D9] rounded-2xl p-6 md:p-8 text-[#26332B] shadow-2xs">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EAF5E4] text-[#245C3A] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-0.5">
                {deliveryState.delivered
                  ? t(
                      `INQUIRY DELIVERED · REF #${deliveryState.inquiryId}`,
                      `မေးမြန်းလွှာ ပေးပို့ပြီးပါပြီ · အမှတ်စဉ် #${deliveryState.inquiryId}`
                    )
                  : t(
                      `INQUIRY RECORDED ON SERVER · REF #${deliveryState.inquiryId}`,
                      `မေးမြန်းလွှာ လက်ခံမှတ်တမ်းတင်ပြီးပါပြီ · အမှတ်စဉ် #${deliveryState.inquiryId}`
                    )}
              </p>
              <h3 className="text-xl font-bold text-[#173D2A]">
                {deliveryState.delivered
                  ? t(
                      'Your Inquiry Has Been Sent to TB Star Company Limited',
                      'သင်၏ စုံစမ်းမေးမြန်းလွှာကို TBStar Company Limited သို့ ပေးပို့ပြီးပါပြီ'
                    )
                  : t(
                      'Inquiry Validated & Logged — Choose Direct Dispatch Below',
                      'မေးမြန်းလွှာကို စစ်ဆေးမှတ်တမ်းတင်ပြီးပါပြီ — တိုက်ရိုက်ပေးပို့ရန် ရွေးချယ်နိုင်ပါသည်'
                    )}
              </h3>
            </div>
          </div>
          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#26332B]/70 hover:text-[#173D2A] rounded-lg transition-colors cursor-pointer"
              aria-label="Close inquiry modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {deliveryState.delivered ? (
          <div className="p-4 rounded-lg bg-[#EAF5E4] border border-[#C3E4B5] text-sm text-[#173D2A] leading-relaxed mb-5">
            {isMm ? (
              <p>
                သင်၏ စုံစမ်းမေးမြန်းလွှာ (အမှတ်စဉ် <strong>{deliveryState.inquiryId}</strong>) ကို ရန်ကုန်ရုံးချုပ်သို့ အောင်မြင်စွာ ပေးပို့ပြီးဖြစ်ပါသည်။ အရေးကြီးကိစ္စရပ်များအတွက် ဖုန်း{' '}
                <a href={COMPANY_INFO.telephoneHref} className="font-bold underline">
                  {COMPANY_INFO.telephone}
                </a>{' '}
                သို့လည်း တိုက်ရိုက် ဆက်သွယ်နိုင်ပါသည်။
              </p>
            ) : (
              <p>
                Your inquiry (Reference <strong>{deliveryState.inquiryId}</strong>) has been delivered to our team. For urgent assistance, you may also reach our Yangon office at{' '}
                <a href={COMPANY_INFO.telephoneHref} className="font-bold underline">
                  {COMPANY_INFO.telephone}
                </a>
                .
              </p>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-950 leading-relaxed mb-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">
                {t(
                  'Server Record Saved — External Email Forwarding Not Configured',
                  'Server တွင် မှတ်တမ်းတင်ပြီးပါပြီ — အီးမေးလ် သို့မဟုတ် WhatsApp ဖြင့် တိုက်ရိုက်ပေးပို့နိုင်ပါသည်'
                )}
              </p>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                {t(
                  `Your inquiry (${deliveryState.inquiryId}) was validated and saved on the server, but outbound SMTP/email credentials are not yet configured on this server environment. To ensure immediate delivery to our Yangon desk, please click "Send via Email App" or "Send via WhatsApp" below.`,
                  `သင်၏ မေးမြန်းလွှာ (${deliveryState.inquiryId}) ကို Server တွင် မှတ်တမ်းတင်ထားပြီးဖြစ်သော်လည်း SMTP Email စနစ် ချိတ်ဆက်မထားသေးသဖြင့် ရန်ကုန်ရုံးချုပ်သို့ ချက်ချင်းရောက်ရှိစေရန် အောက်ပါ "Send via Email App" သို့မဟုတ် "Send via WhatsApp" ခလုတ်ကိုနှိပ်၍ ပေးပို့နိုင်ပါသည်။`
                )}
              </p>
            </div>
          </div>
        )}

        <pre className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-lg p-4 text-xs font-mono-tabular text-[#173D2A] whitespace-pre-wrap mb-6 overflow-x-auto">
          {submittedSummary}
        </pre>

        <div className="flex flex-wrap items-center gap-3">
          {!deliveryState.delivered && (
            <>
              <a
                href={directMailtoHref}
                className="px-4 py-2.5 bg-[#173D2A] hover:bg-[#245C3A] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Mail className="w-4 h-4 text-[#A8D977]" />
                {t('Send via Email App', 'အီးမေးလ်ဖြင့် တိုက်ရိုက်ပို့ရန်')}
              </a>

              <a
                href={directWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#25D366] hover:bg-[#1fb855] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                {t('Send via WhatsApp', 'WhatsApp ဖြင့် ပေးပို့ရန်')}
              </a>
            </>
          )}

          <Button type="button" variant="outline-dark" size="sm" onClick={handleCopySummary}>
            {copied ? (
              <Check className="w-4 h-4 text-[#245C3A]" />
            ) : (
              <Copy className="w-4 h-4 text-[#245C3A]" />
            )}
            {copied
              ? t('Copied Inquiry Summary', 'ကူးယူပြီးပါပြီ')
              : t('Copy Inquiry Summary', 'အချက်အလက်များ ကူးယူရန်')}
          </Button>

          <a
            href={COMPANY_INFO.telephoneHref}
            className="px-4 py-2 bg-[#A8D977] hover:bg-[#97cc64] text-[#173D2A] text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            {t(`Call ${COMPANY_INFO.telephone}`, `ဖုန်းခေါ်ဆိုရန် ${COMPANY_INFO.telephone}`)}
          </a>

          <Button
            type="button"
            variant="outline-dark"
            size="sm"
            onClick={() => {
              setSubmittedSummary(null);
              setDeliveryState(null);
              formRenderedAtRef.current = Date.now();
            }}
          >
            {t('New / Edit Inquiry', 'အသစ်ထပ်မံပေးပို့ရန်')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      id={isModal ? undefined : 'inquiry-form'}
      onSubmit={validateAndSubmit}
      noValidate
      className="bg-white border border-[#DDE5D9] rounded-2xl p-6 md:p-8 text-[#26332B] shadow-2xs"
      aria-label="Corporate Contact and Product Inquiry Form"
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs text-[#245C3A] font-medium mb-1">
            {t(
              'Bamboo, Activated Carbon, Printing & Stationery Inquiry',
              'ဝါးထုတ်ကုန်၊ အက်တီဗိတ်တက် ကာဗွန်၊ ပုံနှိပ်နှင့် စာရေးကိရိယာ စုံစမ်းမေးမြန်းလွှာ'
            )}
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-[#173D2A]">
            {t(
              `Send an Inquiry to ${COMPANY_INFO.name}`,
              'TBStar Company Limited သို့ ဆက်သွယ်မေးမြန်းရန်'
            )}
          </h3>
        </div>
        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#26332B]/70 hover:text-[#173D2A] rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Honeypot anti-spam field hidden from human users & screen readers */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`website-hp-${prefix}`}>Website (Leave blank)</label>
        <input
          id={`website-hp-${prefix}`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={websiteHoneypot}
          onChange={(e) => setWebsiteHoneypot(e.target.value)}
        />
      </div>

      {errorMessage && (
        <div className="mb-6">
          <ErrorMessage
            message={errorMessage}
            onDismiss={() => setErrorMessage(null)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor={`full-name-${prefix}`}
            className="block text-xs font-semibold text-[#173D2A] mb-1.5"
          >
            {t('Full Name', 'အမည်အပြည့်အစုံ')} <span className="text-red-600">*</span>
          </label>
          <input
            id={`full-name-${prefix}`}
            name="fullName"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('Your Full Name', 'သင်၏ အမည်')}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE5D9] bg-[#F6F8F3]/60 text-sm text-[#26332B] focus:bg-white focus:border-[#245C3A] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor={`company-name-${prefix}`}
            className="block text-xs font-semibold text-[#173D2A] mb-1.5"
          >
            {t('Company Name', 'ကုမ္ပဏီ / လုပ်ငန်းအမည်')}{' '}
            <span className="text-[#26332B]/60 font-normal">
              {t('(optional)', '(ထည့်သွင်းနိုင်သည်)')}
            </span>
          </label>
          <input
            id={`company-name-${prefix}`}
            name="companyName"
            type="text"
            maxLength={150}
            autoComplete="organization"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder={t('Company or Business Name', 'ကုမ္ပဏီ သို့မဟုတ် လုပ်ငန်းအမည်')}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE5D9] bg-[#F6F8F3]/60 text-sm text-[#26332B] focus:bg-white focus:border-[#245C3A] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor={`email-${prefix}`}
            className="block text-xs font-semibold text-[#173D2A] mb-1.5"
          >
            {t('Email Address', 'အီးမေးလ်လိပ်စာ')} <span className="text-red-600">*</span>
          </label>
          <input
            id={`email-${prefix}`}
            name="email"
            type="email"
            required
            maxLength={160}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE5D9] bg-[#F6F8F3]/60 text-sm text-[#26332B] focus:bg-white focus:border-[#245C3A] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor={`phone-${prefix}`}
            className="block text-xs font-semibold text-[#173D2A] mb-1.5"
          >
            {t('Phone Number', 'ဖုန်းနံပါတ်')} <span className="text-red-600">*</span>
          </label>
          <input
            id={`phone-${prefix}`}
            name="phone"
            type="tel"
            required
            maxLength={25}
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t('+95 9 ... or International Number', '+95 9 ... သို့မဟုတ် ဆက်သွယ်ရန်ဖုန်း')}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE5D9] bg-[#F6F8F3]/60 text-sm text-[#26332B] focus:bg-white focus:border-[#245C3A] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor={`inquiry-type-${prefix}`}
          className="block text-xs font-semibold text-[#173D2A] mb-1.5"
        >
          {t('Inquiry Type', 'မေးမြန်းလိုသည့် ကဏ္ဍ')} <span className="text-red-600">*</span>
        </label>
        <select
          id={`inquiry-type-${prefix}`}
          name="inquiryType"
          value={inquiryType}
          onChange={(e) => handleCategoryChange(e.target.value as InquiryTypeOption)}
          className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE5D9] bg-[#F6F8F3]/60 text-sm text-[#26332B] focus:bg-white focus:border-[#245C3A] focus:outline-none transition-colors"
        >
          {INQUIRY_TYPE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {isMm ? INQUIRY_TYPE_LABELS[option].mm : INQUIRY_TYPE_LABELS[option].en}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label
          htmlFor={`message-${prefix}`}
          className="block text-xs font-semibold text-[#173D2A] mb-1.5"
        >
          {t('Message', 'မေးမြန်းလိုသည့် အကြောင်းအရာ အသေးစိတ်')} <span className="text-red-600">*</span>
        </label>
        <textarea
          id={`message-${prefix}`}
          name="message"
          rows={4}
          required
          maxLength={3000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t(
            'Specify product requirements (e.g., Bamboo Split With Nodes 50 pcs/bundle or Without Nodes 100 pcs/bundle, Bamboo Sticks 8"/9"/10" in 30 kg bags, Activated Carbon inquiry, Books / Voucher Books Printing, or Ball Pen Klick 30 pcs/box / Plano 50 pcs/box)...',
            'လိုအပ်သော ကုန်ပစ္စည်းအချက်အလက် (ဥပမာ - ဝါးခြမ်း အဆစ်ပါ 50 pcs/bundle သို့မဟုတ် အဆစ်မပါ 100 pcs/bundle၊ 30 kg အိတ်သွင်း ဝါးတံ၊ Activated Carbon၊ စာအုပ်/ဘောင်ချာစာအုပ် ပုံနှိပ်ခြင်း သို့မဟုတ် Ball Pen Klick / Plano) ကို ရေးသားပေးပါ...'
          )}
          className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE5D9] bg-[#F6F8F3]/60 text-sm text-[#26332B] focus:bg-white focus:border-[#245C3A] focus:outline-none transition-colors resize-y"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#DDE5D9]">
        <p className="text-xs text-[#26332B]/75">
          {t(
            `Direct Inquiries: ${COMPANY_INFO.telephone} · Yangon Office`,
            `တိုက်ရိုက်ဖုန်းဆက်သွယ်ရန် - ${COMPANY_INFO.telephone} · ရန်ကုန်ရုံးချုပ်`
          )}
        </p>
        <Button
          type="submit"
          variant="primary-dark"
          isLoading={isSubmitting}
        >
          <FileText className="w-4 h-4 text-[#A8D977]" />
          {isSubmitting
            ? t('Sending Inquiry...', 'ပေးပို့နေပါသည်...')
            : t('Submit Inquiry', 'ဆက်သွယ်မေးမြန်းလွှာ ပေးပို့ရန်')}
        </Button>
      </div>
    </form>
  );
};

export const InquiryForm = ContactForm;

interface InquiryModalProps {
  isOpen: boolean;
  defaultInquiryType: InquiryTypeOption;
  onSelectInquiryType?: (type: InquiryTypeOption) => void;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  defaultInquiryType,
  onSelectInquiryType,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#173D2A]/75 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Business Inquiry Dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-2xl my-8">
        <ContactForm
          selectedInquiryType={defaultInquiryType}
          onSelectInquiryType={onSelectInquiryType}
          onClose={onClose}
          isModal={true}
        />
      </div>
    </div>
  );
};
