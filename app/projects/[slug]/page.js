// app/blog/[slug]/page.js
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function ProjectDetail({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="text-sm text-gray-500 mb-2">{project.releaseDate} </p>
      <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
      <div className="grid grid-cols-2 gap-2">
        <Image
          src={project.image}
          alt={project.title}
          width={1000}
          height={600}
          className="rounded mb-6"
        />
        <article className="prose prose-lg prose-invert font-raleway">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {project.content}
          </ReactMarkdown>
        </article>
      </div>
      <div className="grid grid-cols-2 gap-6">
      <article className="prose prose-lg prose-invert font-raleway">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {project.content1}
          </ReactMarkdown>
          </article>
          <Image
          src={project.image1}
          alt={project.title}
          width={1000}
          height={600}
          className="rounded mb-6"
        /></div>
    </div>
  );
}
