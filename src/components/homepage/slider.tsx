"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface Sider {
  id: number;
  judul: string;
  tentang: string;
  background: string;
}

export default function Slidery() {
  const [data, setData] = useState<Sider[]>([]); // Gunakan tipe Customer[]

  // Fetch data pelanggan dari API
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get<Sider[]>(
        `${process.env.NEXT_PUBLIC_API_URL}slider`
      ); // Tipekan response axios
      setData(res.data);
    } catch (error) {
      console.error("Error fetching datas:", error);
    }
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1, // Default untuk layar lebar
    responsive: [
      {
        breakpoint: 600, // Layar kecil
        settings: {
          slidesToShow: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 1024, // Layar sedang
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <div className="bg-gray-600 py-10 px-5 sm:px-10 md:px-20 rounded-md">
      <h1 className="pb-5 text-white font-bold text-xl md:text-2xl">
        Daftar Event
      </h1>

      <div className="flex justify-center">
        <div className="w-full md:w-3/4 ">
          <Slider {...settings}>
            {data.map((dt) => (
              <div key={dt.id} className="px-2 mx-auto mb-8 mt-10">
                <div
                  style={{
                    backgroundImage: `url("${process.env.NEXT_PUBLIC_API_URL}${dt.background}")`,
                  }}
                  className="relative h-64 sm:h-80 md:h-96 bg-cover rounded-md group hover:scale-105 transition-transform duration-300"
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white bg-black bg-opacity-50 rounded-b-md">
                    <h2 className="text-lg sm:text-xl font-semibold">
                      {dt.judul}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
