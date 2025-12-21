// import Image from "next/image";

// const Hero = () => {
//   return (
//     <section className="relative h-screen flex items-center justify-center text-white">
      
//       {/* Background Image */}
//       <Image
//         src="/img1.jpg"
//         alt="Architecture Hero"
//         fill
//         priority
//         className="object-cover"
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/50" />

//       {/* Content */}
//       <div className="relative z-10 text-center max-w-3xl px-6">
//         <h1 className="text-4xl md:text-6xl font-light tracking-wide">
//           Designing Spaces That Inspire
//         </h1>

//         <p className="mt-6 text-lg text-gray-300">
//           Architecture rooted in context, material, and clarity.
//         </p>

//         <div className="mt-10 flex justify-center gap-4">
//           <a
//             href="/projects"
//             className="border border-white px-6 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition"
//           >
//             View Projects
//           </a>
//           <a
//             href="/contact"
//             className="px-6 py-3 text-sm uppercase tracking-widest text-gray-300 hover:text-white"
//           >
//             Contact
//           </a>
//         </div>
//       </div>

//     </section>
//   );
// };

// export default Hero;

// components/Hero.js
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen">
      <Image
        src="/img1.jpg"
        alt="Architecture"
        fill
        priority
        className="object-cover"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex items-center h-full px-6 text-white">
        <h1 className="text-5xl font-light">
          Designing Spaces That Inspire
        </h1>
      </div>
    </section>
  );
}

