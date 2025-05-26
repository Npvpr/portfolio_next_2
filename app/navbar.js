"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "PROJECTS", href: "/projects" },
    { name: "BLOG", href: "/blog" },
    { name: "CV", href: "/cv" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <nav className="bg-black text-white px-2 sm:px-20 py-4  pb-8 flex justify-between items-center relative">
      <Link href="/">
        <div className="text-xl font-bold font-raleway">
          Naing Lin Maung, Software Developer
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`hover:text-gray-400 relative inline-block text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full ${
              pathname === link.href ? "after:w-full" : ""
            }`}
          >
            <span className="font-raleway">{link.name}</span>
          </Link>
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
          className="absolute mt-2 top-16 left-0 w-full bg-black flex flex-col items-center gap-4 py-4 sm:hidden z-10
        animate-slideDown"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`hover:text-gray-400 ${
                pathname === link.href ? "text-red" : ""
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
