import React from "react";
import Hero from "./components/Hero";
import ServicesSlider from "./components/ServicesSlider";
import ContactPage from "./contact/page";
import AboutPage from "./about/page";
import EventsPage from "./events/page";
import ProjectsPage from "./projects/page";

const HomePage = () => {
  return (
    <div>
      <section id="home" className="relative isolate overflow-hidden">
        <Hero />
      </section>

      <section id="about" >
        <AboutPage />
      </section>

      <section id="services" >
        <ServicesSlider />
      </section>

      <section id="projects">
        <ProjectsPage />
      </section>
      <section id="events">
        <EventsPage />
      </section>

      <section id="contact" className="relative isolate">
        <ContactPage />
      </section>
    </div>
  );
};

export default HomePage;
