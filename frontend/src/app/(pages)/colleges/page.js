import { Suspense } from 'react';
import CollegesClient from './CollegesClient';

export const metadata = {
  title: 'Top Colleges in Dehradun & Uttarakhand 2026 — Find Best College | Guidevera',
  description: 'Explore top NAAC A+, NIRF-ranked & AICTE-approved colleges in Dehradun & Uttarakhand. Compare B.Tech, MBA, BCA, Law & more courses. Find your perfect college with Guidevera.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://guidevera.com/colleges',
  },
  openGraph: {
    title: 'Top Colleges in Dehradun & Uttarakhand — Guidevera',
    description: 'Browse NAAC A+, NIRF-ranked & AICTE-approved colleges in Uttarakhand. Compare courses, fees & placements. Find your perfect college on Guidevera.',
    url: 'https://guidevera.com/colleges',
    type: 'website',
    images: ['https://guidevera.com/guidevera-logo.png'],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Colleges in Dehradun & Uttarakhand — Guidevera',
    description: 'Browse top colleges in Uttarakhand — NAAC A+, NIRF-ranked & AICTE-approved. Compare courses & find your perfect fit.',
    images: ['https://guidevera.com/guidevera-logo.png'],
  },
};

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#0EB4A6] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CollegesClient />
    </Suspense>
  );
}
