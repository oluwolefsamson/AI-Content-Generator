// src/routes/Home.jsx
import React from "react";
import {
  Billing,
  Business,
  CardDeal,
  Clients,
  CTA,
  Hero,
  Stats,
  Testimonials,
} from "../components";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <Business />
      <Billing />
      <CardDeal />
      <Testimonials />
      <Clients />
      <CTA />
    </div>
  );
};

export default HomePage;
