import React from "react";
import ReactMarkdown from "react-markdown";
import { cv } from "@/data/cv";

export default function CVPage() {
  return (
    <main className="bg-zinc-900 text-white font-raleway p-6 max-w-2xl mx-auto prose prose-invert">
    <ReactMarkdown>{cv}</ReactMarkdown>
  </main>
  );
}
