// app/blog/page.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/lib/blogs";

export default function BlogListPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">All Blog Posts</h1>
      <div className="grid gap-6">
        {blogs.map((blog) => (
          <Link
            href={`/blog/${blog.slug}`}
            key={blog.slug}
            className="block border rounded p-4 hover:shadow-lg transition"
          >
            <div className="grid grid-cols-3 gap-4">
              <Image
                src={blog.image}
                alt={blog.title}
                width={800}
                height={400}
                className="rounded"
              />
              <div className="col-span-2">
                <h2 className="text-2xl font-semibold">{blog.title}</h2>
                <p className="text-sm text-gray-500">
                  {blog.date} | {blog.tags.join(", ")}
                </p>
                <p className="mt-2 text-white">{blog.snippet}</p>
                <p className="mt-2 text-indigo-600 font-medium">
                  Continue reading →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
