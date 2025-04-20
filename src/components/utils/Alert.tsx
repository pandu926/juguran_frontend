"use client";
import Image from "next/image";
import React, { useEffect } from "react";

interface AlertProps {
  pesan: string;
  icon: string;
  durasi: number;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ pesan, icon, durasi, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Tutup alert setelah durasi tertentu
    }, durasi);

    return () => clearTimeout(timer); // Bersihkan timer jika komponen unmount
  }, [durasi, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center bg-white p-20 rounded-lg shadow-lg relative">
        <Image
          src={`/assets/icon/${icon}`}
          width={60} // Disesuaikan ukuran gambar
          height={60}
          alt="warning logo"
        />
        <p className="mt-4 text-center text-lg font-semibold text-gray-800">
          {pesan}
        </p>
      </div>
    </div>
  );
};

export default Alert;
