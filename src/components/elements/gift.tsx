import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@/components/atom/icon";
import { useEffect, useState } from "react";

import confetti from "canvas-confetti";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Gift = ({ birthDate = "2002-05-22" }: { birthDate: string }) => {
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    if (!birthDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const birth = new Date(birthDate);

      // Tentukan ulang tahun berikutnya
      const nextBirthday = new Date(
        now.getFullYear(),
        birth.getMonth(),
        birth.getDate(),
      );

      if (nextBirthday < now) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
      }

      const distance = nextBirthday.getTime() - now.getTime();

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [birthDate]);

  const handleClick = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <motion.div
      className="relative z-[60] w-fit translate-x-4 translate-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-pink animate-bounce cursor-pointer rounded-full p-2"
            onClick={handleClick}
          >
            <Icon name="gift" className="size-5 stroke-white" />
          </div>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="font-lexend text-pink font-medium">
              Birthday Reminder
            </DialogTitle>
            <DialogDescription>
              <div className="mt-5 flex flex-col items-center gap-5">
                {countdown && (
                  <div className="font-lexend flex items-center gap-5">
                    <div className="font-lexend flex flex-col gap-2">
                      <p className="text-pink text-2xl">{countdown.days}</p>
                      <p>Days</p>
                    </div>
                    <p>:</p>
                    <div className="flex flex-col gap-2">
                      <p className="text-pink text-2xl">{countdown.hours}</p>
                      <p>Hour</p>
                    </div>
                    <p>:</p>
                    <div className="flex flex-col gap-2">
                      <p className="text-pink text-2xl">{countdown.minutes}</p>
                      <p>Minute</p>
                    </div>
                    <p>:</p>
                    <div className="flex flex-col gap-2">
                      <p className="text-pink text-2xl">{countdown.seconds}</p>
                      <p>Second</p>
                    </div>
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Gift;
