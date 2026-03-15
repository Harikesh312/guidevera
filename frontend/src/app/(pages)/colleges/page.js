import { Suspense } from 'react';
import CollegesClient from './CollegesClient';

export const metadata = {
  title: 'Top Colleges in India | Guidevera',
  description: 'Explore and compare top-rated colleges in India. Search by city, course, fees, and rating to find the perfect institution for your academic journey.',
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
