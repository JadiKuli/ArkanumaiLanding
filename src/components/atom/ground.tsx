import { motion } from "motion/react";

function Ground({
  theme = "dark",
  className,
}: {
  theme: string;
  className: string;
}) {
  return (
    <motion.div
      animate={{ translateY: 0 }}
      transition={{ duration: 2 }}
      initial={{ translateY: 500 }}
      className={`h-10 w-full lg:h-20 ${className} ${theme === "dark" ? "bg-night-1" : "bg-day-1"}`}
    />
  );
}

export default Ground;
