/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  async redirects() {
    return [
      // HTTP → HTTPS redirect
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://guidevera.com/:path*',
        permanent: true,
      },
      // College URL 301 Redirects (old → new SEO-friendly URLs)
      { source: '/colleges/dbuu', destination: '/colleges/dev-bhoomi-uttarakhand-university-dehradun', permanent: true },
      { source: '/colleges/uttranchal-university', destination: '/colleges/uttranchal-university-dehradun', permanent: true },
      { source: '/colleges/graphic-era', destination: '/colleges/graphic-era-university-dehradun', permanent: true },
      { source: '/colleges/ims-unision', destination: '/colleges/ims-unision-university-dehradun', permanent: true },
      { source: '/colleges/dbs-global', destination: '/colleges/dbs-global-university-dehradun', permanent: true },
      { source: '/colleges/tulas-institute', destination: '/colleges/tulas-institute-dehradun', permanent: true },
      { source: '/colleges/itm-dehradun', destination: '/colleges/itm-university-dehradun', permanent: true },
      { source: '/colleges/shivalik-college', destination: '/colleges/shivalik-college-of-engineering-dehradun', permanent: true },
      { source: '/colleges/dolphin-institute', destination: '/colleges/dolphin-institute-dehradun', permanent: true },
    ];
  },
};

export default nextConfig;
