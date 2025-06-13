// app/blog/page.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNotionBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const json = await res.json();
        setBlogs(json);
        setError(null);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Failed to load blog. Please try again later!");
      } finally {
        setLoading(false);
      }
    }

    fetchNotionBlogs();
  }, []);

  useEffect(() => {
    console.log("Blogs updated:", blogs);
  }, [blogs]);

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">All Blog Posts</h1>
      <div className="grid gap-6">
        {blogs.map((blog) => (
          <Link
            href={`/blogs/${blog.id}`}
            key={blog.id}
            className="bg-zinc-800 rounded p-4 hover:shadow-lg transition"
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
                  {blog.lastupdated} | {blog.tags.join(", ")}
                </p>
                <p className="mt-2 text-white">{blog.description}</p>
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
