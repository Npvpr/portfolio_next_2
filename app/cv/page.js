import React from "react";
import ReactMarkdown from "react-markdown";
import { cv } from "@/lib/cv";

export default function CVPage() {
  return (
    <main className="bg-black text-white font-raleway p-6 max-w-2xl mx-auto prose prose-invert">
    <ReactMarkdown>{cv}</ReactMarkdown>
  </main>
  );
}
