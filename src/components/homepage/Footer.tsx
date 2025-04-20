"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Sosmed {
  link: string;
  background: string;
}

export default function Footer() {
  const [data, setData] = useState<Sosmed[]>([]); // Gunakan tipe Customer[]

  // Fetch data pelanggan dari API
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get<Sosmed[]>(
        `${process.env.NEXT_PUBLIC_API_URL}sosmed`
      ); // Tipekan response axios
      setData(res.data);
    } catch (error) {
      console.error("Error fetching datas:", error);
    }
  };

  return (
    <div className="px-2 md:px-10  py-2">
      <div className="bg-gray-600 w-full rounded-md px-5 py-10 md:px-10">
        {/* Header */}
        <h1 className="font-bold text-base md:text-xl capitalize text-gray-400 text-center  md:text-left">
          Hubungi kami
        </h1>

        {/* Description */}
        <p className="font-bold text-lg md:text-3xl capitalize text-white mt-8 md:mt-10  md:w-3/4">
          Mari diskusikan jika anda ingin menjadi partner dan sponsor di acara
          kami
        </p>

        {/* Social Media Icons */}
        <div className="pt-10 md:pt-20 flex flex-wrap items-center justify-center md:justify-between gap-5 md:w-1/3 mx-auto md:mx-0">
          {data.map((dt) => (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${dt.background}`}
              width="32"
              height="32"
              alt="Instagram"
              className="cursor-pointer"
            />
          ))}
        </div>

        {/* Copyright Section */}
        <div className="border-t-2 border-white mt-10 md:mt-20">
          <p className="mt-5 text-white text-center md:text-left text-lg">
            Copyright 2024{" "}
            <a href="https://pandusubekti.com" className="underline">
              Ahmad Pandu Subekti
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
