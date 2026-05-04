import { notFound } from 'next/navigation';
import { getCollegeBySlug, getAllCollegeSlugs } from '../../../../data/collegesData';
import CollegeDetailClient from './CollegeDetailClient';

export async function generateStaticParams() {
  const slugs = getAllCollegeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) {
    return { title: 'College Not Found | Guidevera' };
  }

  // Use SEO-specific data if available, otherwise fall back to defaults
  const seo = college.seo;
  if (seo) {
    return {
      title: seo.title,
      description: seo.description,
      robots: 'index, follow',
      alternates: {
        canonical: seo.canonical,
      },
      openGraph: {
        title: seo.ogTitle,
        description: seo.ogDescription,
        url: seo.canonical,
        type: 'website',
        images: [{ url: seo.ogImage }],
        locale: 'en_IN',
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.twitterTitle,
        description: seo.twitterDescription,
        images: [seo.twitterImage],
      },
    };
  }

  return {
    title: `${college.name} – Courses, Fees & Placements | Guidevera`,
    description: `Explore ${college.name} in ${college.location}. Get details on courses, fees, placements, and infrastructure. Established ${college.established}.`,
  };
}

export default async function CollegeDetailPage({ params }) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) { notFound(); }

  return (
    <>
      <CollegeDetailClient college={college} />
      {/* Schema JSON-LD blocks — rendered server-side for SEO */}
      {college.schema?.educationalOrg && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(college.schema.educationalOrg) }}
        />
      )}
      {college.schema?.faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(college.schema.faqPage) }}
        />
      )}
    </>
  );
}