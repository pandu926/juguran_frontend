"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

interface Jadwal {
  judul: string;
  tanggal: string;
  deskripsi: string;
}

const Timeline: React.FC = () => {
  const [data, setData] = useState<Jadwal[]>([]); // Gunakan tipe Customer[]

  // Fetch data pelanggan dari API
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get<Jadwal[]>(
        `${process.env.NEXT_PUBLIC_API_URL}jadwal`
      ); // Tipekan response axios
      setData(res.data);
    } catch (error) {
      console.error("Error fetching datas:", error);
    }
  };
  function formatTanggal(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("id-ID", { month: "short" }); // "Apr"
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  return (
    <div className="">
      <h1 className="text-4xl font-bold text-white text-center">Jadwal</h1>
      <div className="min-h-screen text-white flex flex-col justify-center overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
          <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">
            <div className="w-full max-w-3xl mx-auto">
              <div className="-my-6">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="relative pl-8 sm:pl-32 py-6 group"
                  >
                    <div className="font-caveat font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">
                      {item.judul}
                    </div>
                    <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                      <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                        {formatTanggal(item.tanggal)}
                      </time>
                    </div>
                    <div className="text-slate-500">{item.deskripsi}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
