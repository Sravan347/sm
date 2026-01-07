export const metadata = {
  title: "Events & Updates | Spacemotivate",
  description:
    "Stay updated with Spacemotivate’s latest events, exhibitions, and design showcases.",
};

const events = [
  {
    title: "Interior Design Expo 2024",
    date: "March 15, 2024",
    description:
      "Showcasing modern interior trends, materials, and innovative design concepts.",
  },
  {
    title: "Residential Design Workshop",
    date: "June 10, 2024",
    description:
      "An interactive workshop focused on smart space planning and home interiors.",
  },
  {
    title: "Project Launch Event",
    date: "August 5, 2024",
    description:
      "Celebrating the completion of our premium residential interior project.",
  },
];

export default function EventsPage() {
  return (
    <main className="bg-[#faf9f7] text-neutral-900">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-28 pb-24 text-center">
        <h1 className="font-serif text-[2.5rem] leading-tight tracking-tight sm:text-[3rem] md:text-[3.75rem]">
          Events & Updates
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-neutral-600 leading-relaxed sm:text-lg">
          A look at our exhibitions, workshops, project launches, and studio
          updates.
        </p>
      </section>

      {/* EVENTS LIST */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="space-y-12">
          {events.map((event) => (
            <article
              key={event.title}
              className="rounded-2xl border border-neutral-200 bg-white p-8 transition hover:bg-neutral-50"
            >
              <span className="text-xs uppercase tracking-wider text-neutral-500">
                {event.date}
              </span>

              <h2 className="mt-3 font-serif text-xl tracking-tight text-neutral-900">
                {event.title}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                {event.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-28 text-center">
        <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
          Want to collaborate or attend?
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-neutral-600">
          Stay connected with Spacemotivate for upcoming events and design
          updates.
        </p>

        <div className="mt-10">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
