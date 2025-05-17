import { createFileRoute } from "@tanstack/react-router";
import City1 from "@/components/atom/city1";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [theme, setTheme] = useState("dark");

  return (
    <div
      className={`relative w-full h-screen overflow-hidden p-10 transition ${theme === "dark" ? "bg-night-5" : "bg-day-5"} `}
    >
      <div className="w-full flex flex-col gap-4 items-center">
        <h1 className="text-4xl font-bold text-center text-white">
          Example Prompt AI
        </h1>
        <div className="flex gap-2">
          <Switch
            id="theme"
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
          <Label htmlFor="theme" className="cursor-pointer">
            {theme === "dark" ? "Dark" : "Light"} Mode
          </Label>
        </div>
      </div>
      <motion.div className="w-full absolute left-1/2 -translate-x-1/2 bottom-0">
        <City1
          theme={theme}
          className="w-full h-full relative object-contain object-center translate-y-1 -z-10"
        />
        <div
          className={`w-full h-10 ${theme === "dark" ? "bg-night-1" : "bg-day-1"}`}
        />
      </motion.div>
    </div>
  );
}
