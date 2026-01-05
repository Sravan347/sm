"use client";

import { Menu, X, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const headerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);

  const NAV_ITEMS = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects"},
    { id: "events", label: "Events"},
    { id: "contact", label: "Contact" },
  ];

  /* -------------------------------------------
     FORCE SCROLL TO TOP ON PAGE NAVIGATION
     (Fixes hierarchy / partial scroll issue)
  -------------------------------------------- */
  useEffect(() => {
    if (pathname !== "/") {
      window.scrollTo({ top: 0 });
    }
  }, [pathname]);

  /* -------------------------------------------
     SCROLL STATE (optimized)
  -------------------------------------------- */
  useEffect(() => {
    let lastScrolled = false;
    let lastShowTop = false;

    const onScroll = () => {
      const sc = window.scrollY > 60;
      const st = window.scrollY > 400;

      if (sc !== lastScrolled) {
        lastScrolled = sc;
        setScrolled(sc);
      }

      if (st !== lastShowTop) {
        lastShowTop = st;
        setShowTop(st);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* -------------------------------------------
     ACTIVE SECTION OBSERVER
  -------------------------------------------- */
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", "about", "services", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive((prev) =>
              prev !== entry.target.id ? entry.target.id : prev
            );
          }
        });
      },
      { rootMargin: "-20% 0px -40% 0px", threshold: 0.15 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const headerHeight = () => headerRef.current?.clientHeight ?? 96;

  function smoothScrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;

    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight();

    window.scrollTo({ top: y, behavior: "smooth" });
  }

  async function handleNavClick(e, item) {
    // Page navigation (Projects / Events)
    if (item.href) {
      setOpen(false);
      return;
    }

    e?.preventDefault();
    setOpen(false);

    if (pathname !== "/") {
      await router.push("/");

      // wait until section exists
      let tries = 0;
      const tryScroll = () => {
        const el = document.getElementById(item.id);
        if (el || tries > 60) {
          smoothScrollTo(item.id);
          return;
        }
        tries++;
        setTimeout(tryScroll, 50);
      };
      tryScroll();
    } else {
      smoothScrollTo(item.id);
    }
  }

  return (
    <>
      {/* HEADER */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
        style={{ height: "96px" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* LOGO */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, { id: "home" })}
            className="absolute left-1/2 -translate-x-1/2 md:static md:transform-none text-2xl md:text-4xl font-semibold bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent"
          >
            Space Motivate
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex space-x-8 text-white font-medium uppercase tracking-widest text-sm">
            {NAV_ITEMS.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-orange-400"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`hover:text-orange-400 ${
                    active === item.id ? "text-orange-400" : "text-white"
                  }`}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black text-white pt-28 px-6 md:hidden">
          <nav className="flex flex-col space-y-6 text-xl">
            {NAV_ITEMS.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>
      )}

      {/* SCROLL TO TOP */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-6 bottom-6 z-50 bg-orange-400 hover:bg-orange-500 text-white p-3 rounded-full shadow-lg"
        >
          <ChevronUp />
        </button>
      )}
    </>
  );
}
