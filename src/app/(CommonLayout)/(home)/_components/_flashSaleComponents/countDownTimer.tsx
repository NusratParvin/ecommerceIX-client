"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endDate?: Date; // Optional prop
}

export function CountdownTimer({ endDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Default to mid of 2025 if no endDate is provided
    const targetDate = endDate || new Date(2025, 5, 30, 0, 0, 0); // Month is 0-indexed, so 5 represents June

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    // <div className="text-center">
    //   <div className="flex justify-center gap-4 text-lg font-bold">
    //     <div>
    //       <span className="block text-3xl">{timeLeft.days}</span>
    //       <span className="text-sm text-gray-500">Days</span>
    //     </div>
    //     <div>
    //       <span className="block text-3xl">{timeLeft.hours}</span>
    //       <span className="text-sm text-gray-500">Hours</span>
    //     </div>
    //     <div>
    //       <span className="block text-3xl">{timeLeft.minutes}</span>
    //       <span className="text-sm text-gray-500">Minutes</span>
    //     </div>
    //     <div>
    //       <span className="block text-3xl">{timeLeft.seconds}</span>
    //       <span className="text-sm text-gray-500">Seconds</span>
    //     </div>
    //   </div>
    // </div>

    <div className="flex justify-center items-center gap-3 text-white">
      {/* DAYS */}
      <div className="flex flex-row items-center">
        <span className="grid h-8 w-12 place-content-center rounded-md bg-white/70 text-red-600 text-xl font-medium">
          {timeLeft.days}
        </span>
        <span className="mt-1 ml-1   uppercase text-base"> Days</span>
      </div>

      <span className="text-lg text-gray-500">:</span>

      {/* HOURS */}
      <div className="flex flex-row items-center">
        <span className="grid h-8 w-12 place-content-center rounded-md bg-white/70 text-red-600 text-xl font-medium">
          {timeLeft.hours}
        </span>
        <span className="mt-1 ml-1 text-base uppercase  "> Hrs</span>
      </div>

      <span className="text-lg  ">:</span>

      {/* MINUTES */}
      <div className="flex flex-row items-center">
        <span className="grid h-8 w-12 place-content-center rounded-md bg-white/70 text-red-600 text-xl font-medium">
          {timeLeft.minutes}
        </span>
        <span className="mt-1 ml-1 text-base uppercase  "> Mins</span>
      </div>

      <span className="text-lg  ">:</span>

      {/* SECONDS */}
      <div className="flex flex-row items-center">
        <span className="grid h-8 w-12 place-content-center rounded-md bg-white/70 text-red-600 text-xl font-medium">
          {timeLeft.seconds}
        </span>
        <span className="mt-1 ml-1 text-base uppercase  "> Secs</span>
      </div>
    </div>
  );
}
