export const metadata = {
  title: "Our Services | Spacemotivate",
  description:
    "Discover Spacemotivate’s interior design, space planning, renovation, and execution services.",
};

const services = [
  {
    title: "Interior Design",
    description:
      "Personalized interior design solutions that balance aesthetics, comfort, and functionality.",
  },
  {
    title: "Space Planning",
    description:
      "Smart layouts designed to maximize space utilization, lighting, and movement flow.",
  },
  {
    title: "Residential Design",
    description:
      "Elegant and practical designs for homes, apartments, and villas tailored to your lifestyle.",
  },
  {
    title: "Commercial Interiors",
    description:
      "Professional interior solutions for offices, shops, and commercial environments.",
  },
  {
    title: "Renovation & Remodeling",
    description:
      "Modern upgrades and redesigns that transform existing spaces into fresh environments.",
  },
  {
    title: "Design & Execution",
    description:
      "End-to-end project execution including material selection, coordination, and delivery.",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#faf9f7] text-neutral-900">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-28 pb-24 text-center">
        <h1 className="font-serif text-[2.5rem] leading-[1.1] tracking-tight sm:text-[3rem] md:text-[3.75rem]">
          Our Services
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-neutral-600 leading-relaxed sm:text-lg">
          Thoughtful interior design and space planning services shaped by
          clarity, function, and long-term value.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-neutral-200 p-8 transition hover:bg-neutral-50"
            >
              <h2 className="font-serif text-xl tracking-tight text-neutral-900">
                {service.title}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-28 text-center">
        <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
          Ready to transform your space?
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-neutral-600">
          From concept to execution, Spacemotivate brings clarity and craft to
          every project.
        </p>

        <div className="mt-10">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}
