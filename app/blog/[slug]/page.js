// app/blog/[slug]/page.js
import { notFound } from 'next/navigation';
import { blogs } from '@/lib/blogs';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function BlogDetail({ params }) {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="text-sm text-gray-500 mb-2">{blog.date} | {blog.tags.join(', ')}</p>
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      <Image src={blog.image} alt={blog.title} width={1000} height={600} className="rounded mb-6" />
      <article className="prose prose-lg prose-invert font-raleway">
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
