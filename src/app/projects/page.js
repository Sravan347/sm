import Image from "next/image";

export const metadata = {
  title: "Our Projects | Spacemotivate",
  description:
    "Explore Spacemotivate’s interior design projects including residential, commercial, and renovation works.",
};

const projects = [
  {
    title: "Modern Residential Interior",
    category: "Residential",
    description:
      "A contemporary home interior designed with minimal aesthetics, smart storage, and warm lighting.",
    image: "/projects/project1.jpg",
  },
  {
    title: "Luxury Living Room Design",
    category: "Interior Design",
    description:
      "Elegant living space with premium materials, balanced colors, and modern furniture.",
    image: "/projects/project2.jpg",
  },
  {
    title: "Office Workspace Planning",
    category: "Commercial",
    description:
      "Efficient office layout focusing on productivity, comfort, and modern workspace needs.",
    image: "/projects/project3.jpg",
  },
  {
    title: "Kitchen Renovation",
    category: "Renovation",
    description:
      "Functional kitchen redesign with optimized layout, lighting, and modular storage.",
    image: "/projects/project4.jpg",
  },
];

export default function ProjectsPage() {
  return (
    <main className="bg-[#faf9f7] text-neutral-900">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-28 pb-24 text-center">
        <h1 className="font-serif text-[2.5rem] leading-tight tracking-tight sm:text-[3rem] md:text-[3.75rem]">
          Our Projects
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-neutral-600 leading-relaxed sm:text-lg">
          A curated selection of interior projects shaped by clarity,
          craftsmanship, and thoughtful execution.
        </p>
      </section>

      {/* PROJECTS GRID */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:bg-neutral-50"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-7">
                <span className="text-xs uppercase tracking-wider text-neutral-500">
                  {project.category}
                </span>

                <h2 className="mt-3 font-serif text-lg tracking-tight text-neutral-900">
                  {project.title}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-28 text-center">
        <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
          Have a project in mind?
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-neutral-600">
          Let Spacemotivate design and execute your space with precision,
          creativity, and care.
        </p>

        <div className="mt-10">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            Start Your Project
          </a>
        </div>
      </section>
    </main>
  );
}
