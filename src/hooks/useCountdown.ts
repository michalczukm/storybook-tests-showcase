import { useEffect } from "react";

import { useState } from "react";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const useCountdown = (endDate: Date): CountdownState => {
  const [countdown, setCountdown] = useState<CountdownState>(() => {
    const now = new Date().getTime();
    const distance = endDate.getTime() - now;
    const isExpired = distance < 0;

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
      isExpired,
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;
      const isExpired = distance < 0;

      if (isExpired) {
        clearInterval(timer);
        setCountdown((prev) => ({ ...prev, isExpired: true }));
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        isExpired,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return countdown;
};
