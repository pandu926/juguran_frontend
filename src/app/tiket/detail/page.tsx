"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import QRCode from "react-qr-code";
import axios from "axios";
import html2canvas from "html2canvas";

// Interface Tiket
interface Tiket {
  id: number;
  tiket_nomer: string;
  customerId?: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

function TiketDetail() {
  const [tiket, setTiket] = useState<Tiket | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const qrRef = useRef<HTMLDivElement>(null);

  const eventId = searchParams.get("eventid");
  const nomer = searchParams.get("nomer");

  useEffect(() => {
    if (!eventId || !nomer) return;

    const fetchData = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: Tiket }>(
          `${process.env.NEXT_PUBLIC_API_URL}/tiket/search?nomer_hp=${nomer}&eventId=${eventId}`
        );
        setTiket(response.data.data);
      } catch (error) {
        console.error("Error fetching tiket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId, nomer]); // Perbaikan: Dependency array diperbaiki

  // Fungsi untuk mengunduh QR Code sebagai gambar
  const handleDownloadQR = async () => {
    if (!qrRef.current) return;

    try {
      const canvas = await html2canvas(qrRef.current);
      const image = canvas.toDataURL("image/png");

      // Buat elemen <a> untuk mengunduh gambar
      const link = document.createElement("a");
      link.href = image;
      link.download = `QR_Tiket_${tiket?.tiket_nomer}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Gagal mengunduh QR Code:", error);
    }
  };

  return (
    <div className="mx-2 md:mx-10">
      <h1 className="mb-5 mt-10 font-bold text-red-400 text-center">
        Tiket Anda
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : tiket ? (
        <div className="flex flex-col items-center mt-10">
          <h2 className="text-lg font-semibold">Tiket #{tiket.tiket_nomer}</h2>
          <p className="mb-4">
            Status: <strong>{tiket.status}</strong>
          </p>

          {/* QR Code */}
          <div
            ref={qrRef} // Menggunakan ref untuk menangkap elemen QR Code
            className="p-4 bg-white shadow-lg rounded-lg"
          >
            <QRCode
              value={btoa(
                JSON.stringify({
                  id: tiket.id,
                  tiket_nomer: tiket.tiket_nomer,
                })
              )}
              size={200}
            />
          </div>

          {/* Tombol Unduh QR Code */}
          <button
            onClick={handleDownloadQR}
            className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Unduh QR Code
          </button>
        </div>
      ) : (
        <p className="text-center text-red-500">Tiket tidak ditemukan.</p>
      )}
    </div>
  );
}

// Suspense hanya membungkus komponen utama
export default function Sosmed() {
  return (
    <Suspense fallback={<div className="text-center">Memuat tiket...</div>}>
      <TiketDetail />
    </Suspense>
  );
}
