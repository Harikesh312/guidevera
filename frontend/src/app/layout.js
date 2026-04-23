import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LeadWidget from "@/components/LeadWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Guidevera - Your Career Guide",
  description: "Guidevera is a comprehensive platform built to provide students with end-to-end support throughout their academic journey.",
  icons: {
    icon: '/guidevera-icon.png',
    shortcut: '/guidevera-icon.png',
    apple: '/guidevera-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/guidevera-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Guidevera",
              "url": "https://guidevera.com",
              "logo": "https://guidevera.com/guidevera-logo.png",
              "description": "India's #1 student-centric career guidance platform helping students find the right college and career path through psychometric tests and expert counseling.",
              "foundingCountry": "IN",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Support",
                "url": "https://guidevera.com/counseling",
                "availableLanguage": ["English", "Hindi"]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Guidevera",
              "url": "https://guidevera.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://guidevera.com/colleges?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Guidevera",
              "url": "https://guidevera.com",
              "logo": "https://guidevera.com/guidevera-logo.png",
              "description": "Guidevera helps Indian students choose the right college and career through psychometric assessments and expert counseling.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dehradun",
                "addressRegion": "Uttarakhand",
                "addressCountry": "IN"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Guidevera Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Psychometric Ability Test", "url": "https://guidevera.com/ability-test" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Personal Career Counseling", "url": "https://guidevera.com/counseling" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "College Search and Discovery", "url": "https://guidevera.com/colleges" } }
                ]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "What is Guidevera?", "acceptedAnswer": { "@type": "Answer", "text": "Guidevera is India's #1 student-centric career guidance platform that helps students find the right college and career path through psychometric tests, data-driven insights, and expert one-on-one counseling." } },
                { "@type": "Question", "name": "How does the Guidevera ability test work?", "acceptedAnswer": { "@type": "Answer", "text": "Students take a carefully crafted psychometric test on Guidevera that analyzes their strengths, interests, and career fit. They then receive a detailed report and can discuss it with an expert counselor." } },
                { "@type": "Question", "name": "Which colleges are listed on Guidevera?", "acceptedAnswer": { "@type": "Answer", "text": "Guidevera lists top-rated colleges across Uttarakhand and India, including Graphic Era (NIRF Top 50), Uttranchal University (NAAC A+), DBS Global, Tulas Institute, and many more." } },
                { "@type": "Question", "name": "Is Guidevera free to use?", "acceptedAnswer": { "@type": "Answer", "text": "You can browse colleges and explore the platform for free. Premium services like personal counseling sessions are available — visit the counseling page for pricing details." } }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Guidevera",
              "url": "https://guidevera.com",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": "120"
              },
              "review": [
                { "@type": "Review", "author": { "@type": "Person", "name": "Riya Sharma" }, "reviewBody": "Guidevera's ability test gave me clarity about where my true skills lie. I was confused between engineering and design.", "reviewRating": { "@type": "Rating", "ratingValue": "5" } },
                { "@type": "Review", "author": { "@type": "Person", "name": "Arjun Mehta" }, "reviewBody": "The counseling session helped me choose between 3 MBA colleges. Best decision of my life.", "reviewRating": { "@type": "Rating", "ratingValue": "5" } }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <LeadWidget />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MYEVQF4QFX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MYEVQF4QFX');
          `}
        </Script>
      </body>
    </html>
  );
}
