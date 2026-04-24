import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * Reusable CaptchaField Component
 * @param {Object} props
 * @param {Function} props.onVerify - Callback function called when verification is successful
 * @param {string} props.error - Error message to display
 */
const CaptchaField = forwardRef(({ onVerify, error }, ref) => {
  const recaptchaRef = useRef(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  // Expose reset method to parent via ref
  useImperativeHandle(ref, () => ({
    reset: () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
  }));

  if (!siteKey) {
    return (
      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-medium">
        ReCAPTCHA Error: VITE_RECAPTCHA_SITE_KEY is missing in .env
      </div>
    );
  }

  return (
    <div className="py-1 w-full">
      <div className="flex justify-center md:justify-start overflow-hidden">
        <div className="transform scale-[0.85] md:scale-[0.9] lg:scale-[1] origin-left">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            onChange={onVerify}
            theme="dark"
          />
        </div>
      </div>
      {error && (
        <p className="text-red-400 text-[11px] font-semibold px-2 flex items-center animate-pulse mt-1">
          <span className="mr-1.5 text-sm">●</span> {error}
        </p>
      )}
    </div>
  );
});

CaptchaField.displayName = 'CaptchaField';

export default CaptchaField;
