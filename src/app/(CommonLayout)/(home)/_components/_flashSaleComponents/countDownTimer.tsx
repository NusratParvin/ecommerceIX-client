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
    <div className="text-center">
      <div className="flex justify-center gap-4 text-lg font-bold">
        <div>
          <span className="block text-3xl">{timeLeft.days}</span>
          <span className="text-sm text-gray-500">Days</span>
        </div>
        <div>
          <span className="block text-3xl">{timeLeft.hours}</span>
          <span className="text-sm text-gray-500">Hours</span>
        </div>
        <div>
          <span className="block text-3xl">{timeLeft.minutes}</span>
          <span className="text-sm text-gray-500">Minutes</span>
        </div>
        <div>
          <span className="block text-3xl">{timeLeft.seconds}</span>
          <span className="text-sm text-gray-500">Seconds</span>
        </div>
      </div>
    </div>
  );
}
