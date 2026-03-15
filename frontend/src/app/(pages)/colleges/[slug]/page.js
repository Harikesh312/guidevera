import { notFound } from 'next/navigation';
import { getCollegeBySlug, getAllCollegeSlugs } from '../../../../data/collegesData';
import CollegeDetailClient from './CollegeDetailClient';

export async function generateStaticParams() {
  const slugs = getAllCollegeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;  // ← await params here
  const college = getCollegeBySlug(slug);
  if (!college) {
    return { title: 'College Not Found | Guidevera' };
  }
  return {
    title: `${college.name} – Courses, Fees & Placements | Guidevera`,
    description: `Explore ${college.name} in ${college.location}. Get details on courses, fees, placements, and infrastructure. Established ${college.established}.`,
  };
}

export default async function CollegeDetailPage({ params }) {
  const { slug } = await params;  // ← await params here too
  const college = getCollegeBySlug(slug);
  if (!college) { notFound(); }
  return <CollegeDetailClient college={college} />;
}