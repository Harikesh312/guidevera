import BlogDetailClient from './BlogDetailClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `Blog Post | Guidevera`,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
