import React from "react";

import Slidery from "@/components/homepage/slider";
import Timeline from "@/components/homepage/Timeline";
import Venue from "@/components/homepage/Venue";
import SponsorShowcase from "@/components/homepage/Sponsor";
import Footer from "@/components/homepage/Footer";

import Home from "@/components/homepage/Home";

export default function Page() {
  return (
    <div className="overflow-hidden bg-gray-900">
      <Home />
      {/* Placeholder untuk konten tambahan */}

      <div className="py-10 bg-gray-900 px-5 ">
        <Slidery />
      </div>
      <div>
        <Venue />
      </div>
      <div className="bg-gray-900">
        <Timeline />
      </div>
      <div className="bg-gray-900">
        <SponsorShowcase />
      </div>
      <div className="bg-gray-900">
        <Footer />
      </div>
    </div>
  );
}
