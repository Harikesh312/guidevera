import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import CaptchaField from './CaptchaField';

const API_URL = (() => {
  try { return import.meta.env.VITE_API_URL || 'http://localhost:5000'; }
  catch { return 'http://localhost:5000'; }
})();

// All college names — single source of truth
export const COLLEGE_NAMES = [
  'DBUU',
  'Uttranchal University',
  'Graphic Era',
  'DBS Global',
  'Tulas Institute',
  'Shivalik College',
  'IMS Unision University',
  'Dolphin Institute',
  'JBIT Dehradun',
  'ITM Dehradun',
  'Alpine College',
  'Other / Not Sure',
];

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  qualification: '',
  stream: '',
  college: '',
  message: '',
};

const sel = 'w-full bg-[#1A1A1D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0EB4A6] focus:ring-1 focus:ring-[#0EB4A6] transition-all appearance-none';
const inp = 'w-full bg-[#1A1A1D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#0EB4A6] focus:ring-1 focus:ring-[#0EB4A6] transition-all';
const lbl = 'text-xs font-medium text-white/60 uppercase tracking-wider';

/**
 * LeadForm — single reusable counselling enquiry form.
 *
 * Props:
 *   preSelectedCollege  {string}   — pre-select a college (from college cards)
 *   buttonLabel         {string}   — submit button text (default "Get Free Callback")
 *   compact             {boolean}  — 1-column layout for modals/popups
 *   onSuccess           {fn}       — called after successful submission
 */
const LeadForm = forwardRef(function LeadForm(
  { preSelectedCollege = '', buttonLabel = 'Get Free Callback', compact = false, onSuccess },
  ref
) {
  const [form, setForm] = useState({ ...EMPTY_FORM, college: preSelectedCollege });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [captchaToken, setCaptchaToken] = useState(null);
  const [captchaError, setCaptchaError] = useState('');
  const captchaRef = useRef(null);

  // Allow parent to reset the form
  useImperativeHandle(ref, () => ({
    reset() {
      setForm({ ...EMPTY_FORM, college: preSelectedCollege });
      setStatus('idle');
      setCaptchaToken(null);
      captchaRef.current?.reset();
    },
  }));

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setCaptchaError('Please verify you are not a robot');
      return;
    }
    setCaptchaError('');
    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        onSuccess?.();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
        <CheckCircle size={56} className="text-green-400" />
        <h4 className="text-xl font-bold text-green-400">We'll call you within 24 hours! 🎉</h4>
        <p className="text-white/60 text-sm">Our expert counselor will reach out to you shortly.</p>
        <button
          onClick={() => { setForm({ ...EMPTY_FORM, college: preSelectedCollege }); setStatus('idle'); setCaptchaToken(null); captchaRef.current?.reset(); }}
          className="mt-2 px-6 py-2 border border-green-400/30 rounded-full text-green-400 hover:bg-green-400/10 transition-colors text-sm"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Row 1: Name + Phone */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className={lbl}>Full Name *</label>
          <input type="text" required placeholder="Your name" className={inp} value={form.name} onChange={set('name')} />
        </div>
        <div className="space-y-1.5">
          <label className={lbl}>Phone *</label>
          <input type="tel" required placeholder="10-digit number" className={inp} value={form.phone} onChange={set('phone')} />
        </div>
      </div>

      {/* Row 2: Email + Qualification */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className={lbl}>Email</label>
          <input type="email" placeholder="example@email.com" className={inp} value={form.email} onChange={set('email')} />
        </div>
        <div className="space-y-1.5">
          <label className={lbl}>Qualification</label>
          <select className={sel} value={form.qualification} onChange={set('qualification')}>
            <option value="">Select</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 12">Class 12</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Row 3: Stream + College */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className={lbl}>Stream / Interest</label>
          <select className={sel} value={form.stream} onChange={set('stream')}>
            <option value="">Select Stream</option>
            <option value="Science PCM">Science (PCM)</option>
            <option value="Science PCB">Science (PCB)</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Humanities / Arts</option>
            <option value="Engineering">Engineering / BCA</option>
            <option value="Medicine">Medicine / Allied</option>
            <option value="MBA">Management / BBA</option>
            <option value="Law">Law (LLB)</option>
            <option value="Other">Not Sure / Other</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className={lbl}>Preferred College</label>
          <select className={sel} value={form.college} onChange={set('college')}>
            <option value="">Select College</option>
            {COLLEGE_NAMES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Message — full width */}
      <div className="space-y-1.5">
        <label className={lbl}>Any Questions? (Optional)</label>
        <textarea
          placeholder="Tell us what you need help with..."
          rows={2}
          className={`${inp} resize-none`}
          value={form.message}
          onChange={set('message')}
        />
      </div>

      {/* Captcha */}
      <CaptchaField ref={captchaRef} onVerify={setCaptchaToken} error={captchaToken ? '' : captchaError} />

      {/* Error */}
      {status === 'error' && (
        <p className="text-red-400 text-sm text-center bg-red-400/5 py-2 rounded-lg">
          Failed to submit. Please check your connection and try again.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#0EB4A6] hover:bg-[#0c9c90] text-black font-bold py-4 rounded-xl text-base transition-transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 shadow-[0_0_20px_rgba(14,180,166,0.3)]"
      >
        {status === 'loading' ? (
          <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
        ) : (
          <>{buttonLabel} <ArrowRight size={18} /></>
        )}
      </button>
    </form>
  );
});

export default LeadForm;
