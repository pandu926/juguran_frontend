"use client";
import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<null | {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>(null); // Mulai dengan null untuk menghindari mismatch.

  function getTimeRemaining(targetDate: string) {
    const total = Date.parse(targetDate) - Date.now();
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
    const updateTimer = () => {
      const time = getTimeRemaining(targetDate);
      setTimeLeft(time);
    };

    updateTimer(); // Inisialisasi pertama.
    const timer = setInterval(updateTimer, 1000); // Update setiap detik.

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    // Hindari render sebelum waktu tersedia.
    return null;
  }

  return (
    <div className="flex justify-center gap-4 mt-12">
      <TimeBox value={timeLeft.days} label="Hari" />
      <TimeBox value={timeLeft.hours} label="Jam" />
      <TimeBox value={timeLeft.minutes} label="Menit" />
      <TimeBox value={timeLeft.seconds} label="Detik" />
    </div>
  );
};

interface TimeBoxProps {
  value: number;
  label: string;
}

const TimeBox: React.FC<TimeBoxProps> = ({ value, label }) => (
  <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg w-20">
    <span className="text-4xl font-bold text-cyan-400">{value}</span>
    <span className="text-sm text-white capitalize">{label}</span>
  </div>
);

export default CountdownTimer;
