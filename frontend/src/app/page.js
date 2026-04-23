import HomeClient from './HomeClient';

export const metadata = {
  title: 'Guidevera – Find the Right College & Career Path in India',
  description: "Guidevera is India's #1 student-centric career guidance platform. Take a psychometric test, get expert counseling, and choose the best college & course for your future.",
  robots: 'index, follow',
  alternates: { canonical: 'https://guidevera.com/' },
  openGraph: {
    title: 'Guidevera – Your True Guide for Career Clarity',
    description: 'Take a psychometric test, talk to expert counselors, and find the perfect college & course — all in one platform.',
    url: 'https://guidevera.com/',
    type: 'website',
    images: [{ url: 'https://guidevera.com/guidevera-logo.png' }],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guidevera – Find the Right College & Career Path',
    description: "India's student-centric platform for college search, psychometric tests & expert counseling.",
    images: ['https://guidevera.com/guidevera-logo.png'],
  },
};

export default function Home() {
  return <HomeClient />;
}
