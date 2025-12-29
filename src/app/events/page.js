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
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Events & Updates
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our latest events, workshops, exhibitions, and project
            milestones.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="border rounded-xl p-8 hover:shadow-md transition bg-white"
            >
              <span className="text-sm text-gray-500">{event.date}</span>
              <h3 className="text-2xl font-semibold mt-2">
                {event.title}
              </h3>
              <p className="text-gray-600 mt-4">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Want to Collaborate or Attend?
          </h2>
          <p className="text-gray-600 mb-8">
            Stay connected with Spacemotivate for upcoming events and design
            updates.
          </p>
          <a
            href="/contact"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
