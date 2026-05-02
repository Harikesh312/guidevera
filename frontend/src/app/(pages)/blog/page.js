import { Suspense } from 'react';
import BlogClient from './BlogClient';

export const metadata = {
  title: 'Blog – Career Guidance & College Insights | Guidevera',
  description: 'Read expert career guidance, college reviews, exam tips, and student success stories from the Guidevera team.',
};

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b]" />}>
      <BlogClient />
    </Suspense>
  );
}
