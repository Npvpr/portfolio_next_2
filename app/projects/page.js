// app/blog/page.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNotionProjects() {
      try {
        const res = await fetch("/api/projects");
        const json = await res.json();
        setProjects(json);
        setError(null);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Failed to load project. Please try again later!");
      } finally {
        setLoading(false);
      }
    }

    fetchNotionProjects();
  }, []);

  useEffect(() => {
    console.log("Projects updated:", projects);
  }, [projects]);

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-full sm:mx-20 p-6">
      <h1 className="text-4xl font-bold pr-4 mb-8"> Projects </h1>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {projects.map((project, i) => (
            <Link
              href={`/projects/${project.id}`}
              key={i}
              className="bg-zinc-800 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <div className="grid grid-cols-1">
                {isLoading && <LoadingScreen className="h-40 -mb-40"/>}
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={800}
                    height={400}
                    className="w-full h-50 object-cover"
                    onLoad={() => setIsLoading(false)}
                  />
                )}
                <div className="p-3 ">
                  <h3 className="text-xl font-bold text-white pb-4">
                    {project.name}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies?.length > 0 && (
                      <>
                        <span className="text-sm ">Main Technologies:</span>
                        {project.technologies.split(",").map((lang, i) => (
                          <span
                            key={i}
                            className="bg-zinc-700 text-sm text-zinc-200 px-2 py-1 rounded"
                          >
                            {lang.trim()}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.languages?.length > 0 && (
                      <>
                        <span className="text-sm ">Programming languages:</span>
                        {project.languages.split(",").map((lang, i) => (
                          <span
                            key={i}
                            className="bg-zinc-700 text-sm text-zinc-200 px-2 py-1 rounded"
                          >
                            {lang.trim()}
                          </span>
                        ))}
                      </>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.lastupdated?.length > 0 && (
                      <>
                        <span className="text-sm ">Last Updated:</span>
                        <span
                          key={i}
                          className=" text-sm text-zinc-200  rounded"
                        >
                          {project.lastupdated}
                        </span>
                      </>
                    )}
                  </div>

                  {project.description?.length > 0 && (
                    <p className="text-zinc-400 mt-2 text-sm pt-4">
                      {project.description}
                    </p>
                  )}

                  {project.snippet && (
                    <p className="mt-2 text-white text-sm flex-grow">
                      {project.snippet}
                    </p>
                  )}

                  <div className="mt-auto pt-5 flex justify-center">
                    <p className="inline-block px-4 py-2 text-sm font-medium text-white bg-zinc-700 rounded hover:bg-zinc-600 transition">
                      Click for more Info
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
