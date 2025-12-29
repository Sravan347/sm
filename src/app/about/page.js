export const metadata = {
  title: "About Us | Spacemotivate",
  description:
    "Spacemotivate is an interior design and planning studio delivering creative, functional, and elegant spaces for homes and businesses.",
};

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Spacemotivate
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We design thoughtful, functional, and inspiring interiors that turn
            spaces into meaningful experiences.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed">
              Spacemotivate is a creative interior design and space planning
              studio specializing in residential, commercial, and office
              interiors. We believe great design is a balance between beauty,
              functionality, and comfort.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Our team works closely with clients to understand their lifestyle,
              needs, and vision — transforming ideas into well-planned, elegant
              spaces.
            </p>
          </div>

          <div className="bg-gray-200 h-72 rounded-xl flex items-center justify-center text-gray-500">
            Image / Design Visual
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To deliver interior design solutions that are practical,
              innovative, and personalized — ensuring every project reflects
              quality, clarity, and client satisfaction.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become a trusted interior design brand known for thoughtful
              planning, timeless aesthetics, and end-to-end project excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">
            What We Do
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 border rounded-xl hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-3">Interior Design</h4>
              <p className="text-gray-600">
                Customized interior designs for homes, offices, and commercial
                spaces that blend aesthetics with comfort.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-3">Space Planning</h4>
              <p className="text-gray-600">
                Intelligent layouts that maximize space efficiency, lighting,
                and functional flow.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-3">
                Design & Execution
              </h4>
              <p className="text-gray-600">
                From concept to completion, we manage materials, execution, and
                on-site coordination.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-3">
                Renovation & Remodeling
              </h4>
              <p className="text-gray-600">
                Modern upgrades and redesigns that refresh existing spaces
                without compromising structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Why Choose Spacemotivate
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              ✔ Client-focused design approach
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              ✔ Creative & practical solutions
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              ✔ Transparent process & communication
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              ✔ Attention to detail
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              ✔ On-time project delivery
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              ✔ End-to-end service support
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Let’s Design Your Space
          </h2>
          <p className="text-gray-600 mb-8">
            Whether it’s a new home, renovation, or commercial project,
            Spacemotivate is ready to bring your ideas to life.
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
