// "use client";

// import { Menu, Search, User } from "lucide-react";
// import Link from "next/link";

// export default function Header() {
//   return (
//     <header className="w-full bg-white shadow-md px-6 py-4 fixed top-0 left-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">

//         {/* Logo */}
//         <div className="text-5xl font-semibold bg-gradient-to-r from-cyan-500  to-orange-500 bg-clip-text text-transparent">
//           Space Motivate
//         </div>

//         {/* Nav Links */}
//         <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
//           <Link href="/about" className="hover:text-blue-600">About</Link>
//           <Link href="/services" className="hover:text-blue-600">Services</Link>
//           <Link href="/projects" className="hover:text-blue-600">Projects</Link>
//           <Link href="/events" className="hover:text-blue-600">Events</Link>
//         </nav>

//         {/* Icons */}
//         <div className="hidden md:flex items-center space-x-5 text-gray-700">
//           <Search className="cursor-pointer hover:text-blue-600" />
//           <User className="cursor-pointer hover:text-blue-600" />
//         </div>

//         {/* Mobile Menu Icon */}
//         <div className="md:hidden">
//           <Menu className="cursor-pointer" />
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { Menu, Search, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"}
        hover:bg-black/80 hover:backdrop-blur-md
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="text-4xl font-semibold bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
          Space Motivate
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex space-x-8 text-white font-medium uppercase tracking-widest text-sm">
          <Link href="/about" className="hover:text-orange-400">About</Link>
          <Link href="/services" className="hover:text-orange-400">Services</Link>
          <Link href="/projects" className="hover:text-orange-400">Projects</Link>
          <Link href="/events" className="hover:text-orange-400">Events</Link>
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-5 text-white">
          <Search className="cursor-pointer hover:text-orange-400" />
          <User className="cursor-pointer hover:text-orange-400" />
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white">
          <Menu className="cursor-pointer" />
        </div>

      </div>
    </header>
  );
}

