"use client";
import React, { useState, useEffect } from "react";
import InputField from "@/components/homepage/ticket/InputField";
import { useRouter } from "next/navigation";
import axios from "axios";

// Interface untuk Event
interface Event {
  id: number;
  nama_event: string;
}

export default function Page() {
  const router = useRouter();
  const [nomer, setNomer] = useState<string>("");
  const [eventId, setEventId] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]); // Perbaikan tipe data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data event dari API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/event`
        );

        setEvents(response.data); // Ambil langsung array dari API
      } catch (err) {
        setError("Gagal memuat daftar event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!nomer || !eventId) {
      alert("Harap isi semua kolom.");
      return;
    }

    // Redirect ke halaman tiket/detail dengan parameter sesuai input
    router.push(`/tiket/detail?nomer=${nomer}&eventid=${eventId}`);
  };

  return (
    <div className="mx-2 md:mx-10">
      <h1 className="mb-5 mt-10 font-bold text-red-400 text-center">
        Cari Peserta
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        {/* Input Nomor Handphone */}
        <InputField
          label="Nomer Handphone"
          type="text"
          nama="nomer_hp"
          placeholder="Masukkan nomer HP"
          save={(e) => setNomer(e.target.value)}
        />

        {/* Dropdown Pilihan Event */}
        <div>
          <label className="block font-semibold mb-2">Pilih Event</label>
          {loading ? (
            <p>Loading event...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Pilih Event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id.toString()}>
                  {event.nama_event}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Tombol Kirim */}
        <button
          className="bg-red-500 text-white mt-6 px-6 py-2 rounded-md hover:bg-red-600 transition"
          type="submit"
        >
          Cari Tiket
        </button>
      </form>
    </div>
  );
}
