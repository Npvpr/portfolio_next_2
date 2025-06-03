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
        const res = await fetch('/api/projects');
        const json = await res.json();
        setProjects(json);
        setError(null);
      } catch (err) {
        console.error('Fetch failed:', err);
        setError('Failed to load project. Please try again later!')
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
      {loading ? (<LoadingScreen />) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <Link
              href={`/projects/${project.id}`}
              key={i}
              className="block border border-gray-500 rounded p-4 hover:shadow-lg transition "
            >
              <h2 className="text-2xl font-semibold text-center mb-2">
                {project.name}
              </h2>
              <div className="grid grid-cols-1">

                {isLoading && <LoadingScreen />}
                {project.image &&
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={800}
                    height={400}
                    className="rounded mb-4"
                    onLoad={() => setIsLoading(false)}
                  />}

                {project.technologies?.length > 0 && (
                  <p className="mt-2 text-white flex justify-start">
                    <span className="font-bold pr-4">
                      Technologies:
                    </span>
                    <span> {project.technologies}</span>
                  </p>
                )}

                {project.languages?.length > 0 && (
                  <p className="mt-2 text-white flex justify-start">
                    <span className="font-bold pr-4">
                      Programming Languages:
                    </span>
                    <span> {project.languages}</span>
                  </p>
                )}

                {project.lastupdated?.length > 0 && (
                  <p className="mt-2 text-white flex justify-start">
                    <span className="font-bold pr-4">
                      Last updated:
                    </span>
                    <span> {project.lastupdated} </span>
                  </p>
                )}

                {project.description?.length > 0 && (
                  <p className="mt-6 text-white flex justify-start">
                    {/* <span className="font-bold pr-4">
                      
                    </span> */}
                    <span>{project.description}</span>
                  </p>
                )}

                <p className="mt-2 text-white">{project.snippet}</p>
                <p className="mt-2 text-indigo-800 font-medium text-center">
                  Click for more Info
                </p>
              </div>
            </Link>
          ))}
        </div>)}
    </div>
  );
}
