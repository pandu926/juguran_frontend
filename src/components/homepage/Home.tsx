"use client";
import Image from "next/image";
import CountdownTimer from "./countdown";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Main {
  id: number;
  slogan: string;
  tentang: string;
  background: string;
}

export default function Home() {
  const [data, setData] = useState<Main[]>([]); // Gunakan tipe Customer[]

  // Fetch data pelanggan dari API
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get<Main[]>(
        `${process.env.NEXT_PUBLIC_API_URL}main`
      ); // Tipekan response axios
      setData(res.data);
    } catch (error) {
      console.error("Error fetching datas:", error);
    }
  };

  return (
    <div>
      <div>
        <div
          className="bg-black h-screen w-screen"
          style={{
            backgroundImage: `url("${process.env.NEXT_PUBLIC_API_URL}${data[0]?.background}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {/* NAVBAR */}
          <nav className="flex font-semibold capitalize justify-between items-center py-4 px-5 md:px-10">
            {/* Logo */}
            <div className="w-1/3 flex justify-center md:justify-start">
              <a href="#">
                <Image
                  src="/assets/image/logoju.png"
                  width={150}
                  height={70}
                  alt="logo"
                  className="object-contain"
                />
              </a>
            </div>

            {/* Menu */}
            <div className="w-1/3 hidden md:flex justify-between bg-gray-900 text-white py-2 px-5 rounded-3xl">
              <a href="#tentang">tentang</a>
              <p>|</p>
              <a href="#tempat">tempat</a>
              <p>|</p>
              <a href="#jadwal">jadwal</a>
              <p>|</p>
              <a href="#sponsor">sponsor</a>
            </div>

            {/* Button */}
            <div className="w-1/3 flex justify-center md:justify-end">
              <Link
                href="/tiket"
                className="bg-white px-5 md:px-8 py-2 rounded-2xl"
              >
                Pesan Tiket
              </Link>
            </div>
          </nav>

          {/* CONTENT */}
          <div className="mt-14 px-8 md:px-24 text-center md:text-left">
            <h1 className="font-bold text-white md:w-3/5 w-full text-2xl md:text-4xl ">
              {data[0]?.slogan}
            </h1>
            <CountdownTimer targetDate="2025-12-11" />
          </div>
        </div>
      </div>
      <div
        id="tentang"
        className="bg-gray-900 px-5 sm:px-10 md:px-20 py-10 text-white font-bold"
      >
        <div className="flex flex-col md:flex-row md:items-center h-auto md:h-96 gap-8">
          <div className="w-full md:w-1/3 text-center md:text-left text-2xl">
            Tentang Acara
          </div>
          <div className="w-full md:w-2/3 text-justify text-base sm:text-lg md:text-xl font-semibold px-2 md:px-10">
            {data[0]?.tentang}
          </div>
        </div>
      </div>
    </div>
  );
}
