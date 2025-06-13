import Link from "next/link";
import Image from "next/image";
import NotionClientRenderer from "./components/NotionRenderer";
import { NotionAPI } from "notion-client";

export default async function Home() {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage("2115b1c9508a800ea0a2e804b5461acd");

  return (
    <div className="">
      <div
        className="h-[70vh] bg-fixed sm:bg-cover bg-center bg-no-repeat bg-cover flex items-center justify-center text-white text-4xl font-bold"
        style={{
          backgroundImage: "url('/bg.jpg')",
        }}
      >
        <h1 className="text-white sm:text-5xl font-raleway font-bold text-center">
          Naing Lin Maung - Software Developer
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="max-w-5xl mx-7 mt-10">
          <NotionClientRenderer recordMap={recordMap} />
        </div>
      </div>
      {/* <div className="grid grid-cols-3 gap-6 mx-4">
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
      </div> */}

    </div>
  );
}
