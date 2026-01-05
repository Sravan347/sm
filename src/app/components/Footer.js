import Link from "next/link";
import { Github, Twitter, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* TOP GRID */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* BRAND */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
              Space Motivate
            </h2>
            <p className="text-sm leading-relaxed">
              We design and build modern digital experiences that inspire,
              motivate, and scale.
            </p>
          </div>

          {/* NAVIGATION */}
          <nav aria-label="Footer Navigation">
            <h3 className="text-white font-semibold mb-4 uppercase tracking-widest text-xs">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
              <li><Link href="/about" className="hover:text-orange-400">About</Link></li>
              <li><Link href="/services" className="hover:text-orange-400">Services</Link></li>
              <li><Link href="/projects" className="hover:text-orange-400">Projects</Link></li>
              <li><Link href="/events" className="hover:text-orange-400">Events</Link></li>
            </ul>
          </nav>

          {/* LEGAL */}
          <nav aria-label="Legal">
            <h3 className="text-white font-semibold mb-4 uppercase tracking-widest text-xs">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/terms" className="hover:text-orange-400">Terms of Use</Link></li>
              <li><Link href="/privacy" className="hover:text-orange-400">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-orange-400">Contact</Link></li>
            </ul>
          </nav>

          {/* SOCIAL */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-widest text-xs">
              Follow Us
            </h3>
            <div className="flex items-center gap-4">
              <a href="https://github.com" aria-label="Github" className="hover:text-white">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" aria-label="YouTube" className="hover:text-white">
                <Youtube size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-12" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <span>
            © {new Date().getFullYear()} Space Motivate. All rights reserved.
          </span>
          <address className="not-italic">
            Need help?{" "}
            <Link href="/contact" className="text-white hover:text-orange-400">
              Contact Us
            </Link>
          </address>
        </div>
      </div>
    </footer>
  );
}
