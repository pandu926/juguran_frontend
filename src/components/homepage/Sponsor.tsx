"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Sponsor {
  nama: string;
  background: string;
}

const SponsorShowcase: React.FC = () => {
  const [data, setData] = useState<Sponsor[]>([]); // Gunakan tipe Customer[]

  // Fetch data pelanggan dari API
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get<Sponsor[]>(
        `${process.env.NEXT_PUBLIC_API_URL}sponsor`
      ); // Tipekan response axios
      setData(res.data);
    } catch (error) {
      console.error("Error fetching datas:", error);
    }
  };

  return (
    <div id="sponsor" className="bg-gray-900 px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
        Event By
      </h1>

      <div className=" flex flex-wrap justify-center items-center gap-6 md:gap-8 ">
        <img
          src="/assets/image/sponsor/WCCN.png"
          alt="wccc"
          className=" h-full object-contain"
        />
      </div>

      {/* Container Logo */}
      <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-10 mt-10">
        Sponsored
      </h1>
      <div className="flex justify-center">
        <div className="md:w-2/4 w-full max-h-96 overflow-auto">
          <div className="grid grid-cols-3 gap-y-6 md:grid-cols-4  ">
            {data.map((dt, index) => (
              <div
                key={index}
                className="w-20 h-20 md:w-24 md:h-24  lg:w-32 lg:h-32 bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${dt.background}`}
                  alt="kemendikbud"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorShowcase;
