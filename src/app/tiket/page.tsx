"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import InputField from "@/components/homepage/ticket/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface EventOption {
  id: string;
  nama_event: string;
  tempat: string;
  tanggal: string;
}

interface Customer {
  nama_lengkap: string;
  nomer_hp: string;
  alamat: string;
}

export default function page() {
  // State initialization
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer>({
    nama_lengkap: "",
    nomer_hp: "",
    alamat: "",
  });
  const [eventName, setEventName] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [eventOptions, setEventOptions] = useState<EventOption[]>([]);
  const [error, setError] = useState<string>("");

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<EventOption[]>(
          `${process.env.NEXT_PUBLIC_API_URL}event`
        );
        setEventOptions(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Handle event selection change
  const handleEventChange = (eventId: string) => {
    const selectedEvent = eventOptions.find((event) => event.id == eventId);
    if (selectedEvent) {
      setEventName(selectedEvent.nama_event);
      setEventLocation(selectedEvent.tempat);
      setSelectedDate(selectedEvent.tanggal);
    }
  };

  // Form submit handler with validation
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Reset error state on each submit attempt

    // Validasi input customer
    if (!customer.nama_lengkap || !customer.nomer_hp || !customer.alamat) {
      setError("Semua kolom pelanggan harus diisi.");
      return;
    }

    // Validasi apakah event sudah dipilih
    if (!eventName) {
      setError("Harap pilih event terlebih dahulu.");
      return;
    }

    try {
      // Simpan data customer terlebih dahulu
      const customerResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}customer`,
        customer
      );

      const customerId = customerResponse.data.id;
      const nomer = customerResponse.data.nomer_hp; // Ambil ID customer dari response
      console.log("Customer berhasil dibuat:", customerId);

      // Buat tiket setelah customer berhasil dibuat
      await handleTiket(customerId, nomer);
    } catch (error) {
      console.error("Gagal menyimpan customer:", error);
      alert("Gagal menyimpan data pelanggan.");
    }
  };

  const handleTiket = async (customerId: string, nomer: string) => {
    if (!eventOptions.length) {
      alert("Tidak ada event yang tersedia.");
      return;
    }

    const event = eventOptions.find((e) => e.nama_event === eventName);
    if (!event) {
      alert("Event tidak valid.");
      return;
    }

    const eventId = event.id; // Ambil ID event yang dipilih
    const tiket_nomer: string = generateUniqueTicketNumber();
    const status: string = "ACTIVE";

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}tiket`,
        {
          tiket_nomer,
          customerId,
          eventId,
          status,
        }
      );
      alert("Pemesanan tiket berhasil!");
      router.push(`/tiket/detail?nomer=${nomer}&eventid=${eventId}`);
    } catch (error) {
      console.error("Error menyimpan tiket:", error);
      alert("Gagal menyimpan tiket.");
    }
  };

  function generateUniqueTicketNumber() {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `TIKET-${timestamp}-${randomSuffix}`;
  }

  return (
    <div className="mb-20 capitalize">
      <h2 className="mb-16 text-xl font-bold text-center mt-10">Pesan Tiket</h2>
      <div className="px-2 mb-5 md:px-10">
        <div className="mb-6">
          <div className="mb-10">
            Sudah pernah Registrasi dan lupa tiket anda?{" "}
            <span className="text-red-400">
              <Link href="/tiket/cek">Cek Disini</Link>
            </span>
          </div>
          <h4 className="mb-2 font-bold text-red-400">Detail Pelanggan</h4>
          <div className="flex">
            <InputField
              label="Nama Lengkap"
              type="text"
              nama="nama_lengkap"
              placeholder="Masukkan nama lengkap"
              save={(e) =>
                setCustomer((prev) => ({
                  ...prev,
                  nama_lengkap: e.target.value,
                }))
              }
            />
            <InputField
              label="Nomor Handphone"
              type="number"
              nama="nomer_hp"
              placeholder="Masukkan nomor handphone"
              save={(e) =>
                setCustomer((prev) => ({
                  ...prev,
                  nomer_hp: e.target.value,
                }))
              }
            />
          </div>
          <div className="w-full mt-5 text-sm">
            <label htmlFor="note" className="block mb-2">
              Alamat
            </label>
            <textarea
              id="note"
              placeholder="Masukkan alamat lengkap"
              className="w-full h-32 px-4 py-2 mt-2 text-sm border rounded-md"
              value={customer.alamat}
              onChange={(e) =>
                setCustomer((prev) => ({
                  ...prev,
                  alamat: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* Event Section */}
        <form onSubmit={handleSubmit}>
          <h1 className="mb-2 font-bold text-red-400">Detail Acara</h1>
          <div className="flex flex-col">
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="eventName"
              >
                Pilih Acara
              </label>
              <select
                id="eventName"
                value={eventName}
                onChange={(e) => handleEventChange(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
              >
                <option value="" disabled>
                  Pilih nama acara
                </option>
                {eventOptions.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.nama_event}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="eventLocation"
              >
                Tempat Event
              </label>
              <input
                type="text"
                id="eventLocation"
                value={eventLocation}
                readOnly
                className="w-full px-4 py-2 text-sm border rounded-md bg-gray-100"
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="date"
              >
                Tanggal Event
              </label>
              <input
                type="text"
                id="date"
                value={selectedDate}
                readOnly
                className="w-full px-4 py-2 text-sm border rounded-md bg-gray-100"
              />
            </div>
          </div>

          {/* Display error message if there is any validation error */}
          {error && (
            <div className="mt-4 text-red-500 text-sm">
              <strong>{error}</strong>
            </div>
          )}

          <div className="flex justify-center w-full mt-10">
            <button
              type="submit"
              className="w-3/6 px-4 py-2 mt-10 text-sm text-white bg-red-500 rounded-md md:py-3 md:text-base"
            >
              Pesan Tiket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
