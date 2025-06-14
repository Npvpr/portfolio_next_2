"use client";
import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setSuccess(null)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error("Fail to send message: ", error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className=" text-gray-200 flex items-center justify-center">
      <div className="w-full max-w-2xl px-4">
        <h1 className="text-3xl text-center font-semibold mb-6">Contact Me</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email*"
            required
            className=" w-full bg-zinc-800  text-white placeholder-gray-400 p-3 rounded-md focus:outline-none"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name*"
            required
            className="w-full bg-zinc-800  text-white placeholder-gray-400 p-3 rounded-md focus:outline-none"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message*"
            required
            rows={5}
            className="w-full bg-zinc-800  text-white placeholder-gray-400 p-3 rounded-md focus:outline-none"
          />

          <div className="text-center">
            {loading ? <LoadingScreen className="h-0 -mt-10"/> : (
              <button
                type="submit"
                className="inline-block px-8 py-2 text-sm font-medium text-white bg-zinc-700 rounded hover:bg-zinc-600 transition"
              >
                SEND
              </button>)
            }
          </div>
        </form>

        {success === true && <p className="text-green-400 mt-4 text-center">Message sent successfully!</p>}
        {success === false && <p className="text-red-400 mt-4 text-center">Failed to send message.</p>}
      </div>
    </div>
  );
}
