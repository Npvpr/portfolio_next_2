"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [home, setHome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNotionHome() {
      try {
        const res = await fetch("/api/home");
        const json = await res.json();
        setHome(json);
        setError(null);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Failed to load home. Please try again later!");
      } finally {
        setLoading(false);
      }
    }

    fetchNotionHome();
  }, []);

  useEffect(() => {
    console.log("Home updated:", home);
  }, [home]);

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "PROJECTS", href: "/projects" },
    { name: "BLOGS", href: "/blogs" },
    { name: "CV", href: home[0]?.file || "" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-zinc-900 text-white px-2 sm:px-20 py-4 pb-8 flex justify-between items-center ">
      <Link href="/">
        <div className="text-xl font-bold font-raleway">
          Naing Lin Maung, Software Developer
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex gap-6">
        {navLinks.map((link) => (
          <div key={link.name}>
            {link.name === "CV" ?
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={`hover:text-gray-400 relative inline-block text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full ${pathname === link.href ? "after:w-full" : ""
                }`}>
                CV
              </a>
              :
              <Link
                key={link.name}
                href={link.href}
                className={`hover:text-gray-400 relative inline-block text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full ${pathname === link.href ? "after:w-full" : ""
                  }`}
              >
                <span className="font-raleway">{link.name}</span>
              </Link>}
          </ div>
        ))}
      </div>

      {/* Hamburger Icon */}
      <div className="sm:hidden ">
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="absolute mt-2 top-16 left-0 w-full bg-zinc-900 flex flex-col items-center gap-4 py-4 sm:hidden z-10
        animate-slideDown"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`hover:text-gray-400 ${pathname === link.href ? "text-red" : ""
                }`}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
