import Image from "next/image";

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
    icon: "🛋️",
  },
  {
    title: "Space Planning",
    description:
      "Smart layouts designed to maximize space utilization, lighting, and movement flow.",
    icon: "📐",
  },
  {
    title: "Residential Design",
    description:
      "Elegant and practical designs for homes, apartments, and villas tailored to your lifestyle.",
    icon: "🏡",
  },
  {
    title: "Commercial Interiors",
    description:
      "Professional interior solutions for offices, shops, and commercial environments.",
    icon: "🏢",
  },
  {
    title: "Renovation & Remodeling",
    description:
      "Modern upgrades and redesigns that transform existing spaces into fresh environments.",
    icon: "🔨",
  },
  {
    title: "Design & Execution",
    description:
      "End-to-end project execution including material selection, coordination, and delivery.",
    icon: "🏗️",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive interior design and planning services crafted to bring
            your vision to life.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="border rounded-xl p-8 hover:shadow-lg transition bg-white"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-gray-600 mb-8">
            Let Spacemotivate guide you from planning to execution.
          </p>
          <a
            href="/contact"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}
