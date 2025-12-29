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
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A showcase of our thoughtfully designed interiors, smart planning,
            and quality-driven execution.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white border rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-6">
                  <span className="text-sm text-gray-500">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mt-3">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-gray-600 mb-8">
            Let Spacemotivate design and execute your space with creativity,
            precision, and care.
          </p>
          <a
            href="/contact"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Start Your Project
          </a>
        </div>
      </section>
    </main>
  );
}
