import { motion } from "framer-motion";
import { useMemo } from "react";

const generateComets = (count = 20) => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  return Array.from({ length: count }, (_, i) => {
    const startX = Math.random() * (w + 300) - 100; // bisa sedikit
    const startY = Math.random() * -300 - 100; // mulai di atas viewport
    const angleOffset = w * 1.4; // sejauh 120% lebar layar
    return {
      id: i,
      delay: 8 + Math.random() * 6, // 8–20 detik
      duration: 8 + Math.random() * 10, // 8–12 detik
      startX,
      startY,
      endX: startX - angleOffset, // geser ke kiri
      endY: h + 300, // turun lewat bawah
      size: 36 + Math.random() * 36, // ukuran bervariasi
    };
  });
};

export default function CometBackground() {
  const comets = useMemo(() => generateComets(20), []); // 25 komet

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {comets.map((comet) => (
        <motion.svg
          key={comet.id}
          viewBox="0 0 42 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          style={{
            width: comet.size,
            top: comet.startY,
            left: comet.startX,
          }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: comet.endX - comet.startX,
            y: comet.endY - comet.startY,
            opacity: 0,
          }}
          transition={{
            duration: comet.duration,
            delay: comet.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          <path
            d="M1.98486 60.3485L40.9849 0.348511"
            stroke="url(#paint0_linear_51_10)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <defs>
            <linearGradient
              id="paint0_linear_51_10"
              x1="40.6242"
              y1="0.348512"
              x2="21.7867"
              y2="65.9325"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#999999" stopOpacity="0" />
              <stop offset="0.711538" stopColor="white" stopOpacity="0.35" />
              <stop offset="1" stopColor="white" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </motion.svg>
      ))}
    </div>
  );
}
