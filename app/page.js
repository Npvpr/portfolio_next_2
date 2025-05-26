import { intro } from "@/lib/intro";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <div>
      <div
        className="h-[70vh] bg-fixed sm:bg-cover bg-contain bg-center flex items-center justify-center text-white text-4xl font-bold"
        style={{
          backgroundImage: "url('/Developer.png')",
        }}
      >
        <h1 className="text-white sm:text-5xl font-raleway font-bold text-center">
          Naing Lin Maung - Software Developer
        </h1>
      </div>
      <div className="m-5 sm:m-20 text-center font-raleway">
        <ReactMarkdown>{intro}</ReactMarkdown>
      </div>
      <div className="grid grid-cols-3 gap-6 mx-4">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.slug}
            className=""
          >
            
            <div className="grid grid-cols-1 ">
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={400}
                className="rounded"
              />
              <h3 className="text-xl font-semibold text-center mt-2 font-raleway">
              {project.title}
            </h3>
              
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  );
}
