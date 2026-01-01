// components/Hero.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const images = [
    { src: "/img1.jpg", alt: "Modern Architecture Building" },
    { src: "/img2.jpg", alt: "Interior Design Excellence" },
    { src: "/img3.jpg", alt: "Urban Architectural Vision" },
    { src: "/img4.jpg", alt: "Sustainable Design Innovation" },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Manual navigation
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images with Transition */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              quality={90}
              className="object-cover object-center"
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 text-sm font-medium tracking-widest text-white bg-primary/90 backdrop-blur-sm">
              ARCHITECTURAL EXCELLENCE SINCE 2005
            </span>
          </div>
          
          <h1 className="mb-6 text-5xl font-light leading-tight md:text-7xl">
            Designing Spaces That
            <span className="block mt-2 font-medium">Inspire & Transform</span>
          </h1>
          
          <p className="max-w-2xl mx-auto mb-8 text-xl font-light leading-relaxed text-gray-200">
            We craft visionary architecture that blends aesthetic innovation with functional 
            excellence, creating sustainable environments for generations to come.
          </p>
          
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <button className="px-8 py-4 text-lg font-medium tracking-wide text-white transition-all duration-300 bg-primary hover:bg-primary/90 hover:scale-105">
              View Our Portfolio
            </button>
            <button className="px-8 py-4 text-lg font-medium tracking-wide text-white transition-all duration-300 border-2 border-white/50 hover:bg-white/10 hover:border-white backdrop-blur-sm">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-3 text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm rounded-full transition-all duration-300"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-3 text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm rounded-full transition-all duration-300"
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}