"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const services = [
  {
    title: "Interior Design",
    description:
      "Creative and functional interior solutions tailored to your lifestyle.",
    icon: "🛋️",
  },
  {
    title: "Space Planning",
    description:
      "Smart layouts that maximize space efficiency and comfort.",
    icon: "📐",
  },
  {
    title: "Residential Design",
    description:
      "Beautiful and practical home interiors designed with care.",
    icon: "🏡",
  },
  {
    title: "Commercial Interiors",
    description:
      "Professional designs for offices and commercial environments.",
    icon: "🏢",
  },
  {
    title: "Renovation & Remodeling",
    description:
      "Modern upgrades that transform existing spaces seamlessly.",
    icon: "🔨",
  },
  {
    title: "Design & Execution",
    description:
      "End-to-end execution from concept to completion.",
    icon: "🏗️",
  },
];

export default function ServicesSlider() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer complete interior design and planning services to bring
            your vision to life.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border rounded-xl p-8 h-full hover:shadow-lg transition">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
