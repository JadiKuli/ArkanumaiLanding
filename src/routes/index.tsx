import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const MotionButton = motion(Button);

  return (
    <div className="p-2 text-2xl">
      <h3>Welcome Home!</h3>
      <MotionButton
        whileHover={{ backgroundColor: "red" }}
        className="cursor-pointer"
      >
        Click
      </MotionButton>
    </div>
  );
}
