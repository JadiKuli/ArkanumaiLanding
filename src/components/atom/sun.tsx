import { motion } from "motion/react";

function Sun({ className }: { className: string }) {
  return (
    <motion.div
      animate={{ translateY: 0, translateX: 0 }}
      transition={{ duration: 2, delay: 6 }}
      initial={{ translateY: 500, translateX: 500 }}
      className={`bg-night-yellow drop-shadow-night-yellow rounded-full ${className}`}
    />
  );
}

export default Sun;
