"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Tempat {
  id: number;
  nama: string;
  waktu: string;
  background: string;
}

const Venue: React.FC = () => {
  const [data, setData] = useState<Tempat[]>([]); // Gunakan tipe Customer[]

  // Fetch data pelanggan dari API
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get<Tempat[]>(
        `${process.env.NEXT_PUBLIC_API_URL}tempat`
      ); // Tipekan response axios
      setData(res.data);
    } catch (error) {
      console.error("Error fetching datas:", error);
    }
  };

  return (
    <div id="tempat" className="bg-gray-900 text-white py-20 ">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-2xl md:text-4xl font-bold">Tempat Pelaksanaan</h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {data.map((dt) => (
          <div
            key={dt.id}
            className="relative w-72 rounded-xl overflow-hidden shadow-lg bg-gray-800 text-white m-4"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${dt.background}`}
              alt={dt.nama}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <p className="text-sm text-gray-400">
                {new Date(dt.waktu).toLocaleDateString("id-ID", {
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <h3 className="text-lg font-bold mt-2">{dt.nama}</h3>
              <div className="mt-4 flex justify-between items-center"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Venue;
