import { createFileRoute } from "@tanstack/react-router";
import City1 from "@/components/atom/city1";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import City2 from "@/components/atom/city2";
import City3 from "@/components/atom/city3";
import Sun from "@/components/atom/sun";
import Ground from "@/components/atom/ground";
import { motion } from "motion/react";
import CometBackground from "@/components/atom/comet";
import {
  Folder,
  MessageCircle,
  FileText,
  Gamepad,
  BookImage,
  Code2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [theme, setTheme] = useState("dark");

  return (
    <div
      className={`relative h-screen w-full overflow-hidden transition ${theme === "dark" ? "bg-night-5" : "bg-day-5"} `}
    >
      <div className="fixed top-4 right-4 flex gap-2">
        <Switch
          id="theme"
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
      </div>
      <CometBackground />
      <motion.div
        animate={{ scale: 1 }}
        transition={{ duration: 2, delay: 8 }}
        initial={{ scale: 0 }}
        className="absolute top-1/2 left-1/2 z-50 flex w-full -translate-x-1/2 -translate-y-2/3 flex-col gap-10 p-8 md:w-2/3 lg:w-1/2"
      >
        <div className="flex flex-col items-center gap-4">
          <h4 className="font-lexend text-3xl text-white">21:45</h4>
          <h1 className="font-tourney text-center text-5xl text-white">
            Example_AI
          </h1>
          <div className="flex flex-col items-center gap-1">
            <h4 className="font-lexend text-white">Malang Indonesia</h4>
            <div className="w-40 border border-b-2" />
            <h4 className="font-lexend text-white">May 25, 2002</h4>
          </div>
        </div>
        <div className="grid grid-cols-4 justify-items-center gap-6">
          <div className="flex flex-col items-center gap-1 text-white">
            <div className="bg-orange flex size-16 items-center justify-center rounded-[10px] border border-white drop-shadow-md">
              <Folder className="size-10 stroke-1 text-white" />
            </div>
            <p className="text-sm">Folder</p>
          </div>
          <div className="flex flex-col items-center gap-1 text-white">
            <div className="bg-orange flex size-16 items-center justify-center rounded-[10px] border border-white drop-shadow-md">
              <MessageCircle className="size-10 stroke-1 text-white" />
            </div>
            <p className="text-sm">Chat</p>
          </div>
          <div className="flex flex-col items-center gap-1 text-white">
            <div className="bg-orange flex size-16 items-center justify-center rounded-[10px] border border-white drop-shadow-md">
              <FileText className="size-10 stroke-1 text-white" />
            </div>
            <p className="text-sm">Document</p>
          </div>
          <div className="flex flex-col items-center gap-1 text-white">
            <div className="bg-orange flex size-16 items-center justify-center rounded-[10px] border border-white drop-shadow-md">
              <Gamepad className="size-10 stroke-1 text-white" />
            </div>
            <p className="text-sm">Game</p>
          </div>
          <div className="flex flex-col items-center gap-1 text-white">
            <div className="bg-orange flex size-16 items-center justify-center rounded-[10px] border border-white drop-shadow-md">
              <BookImage className="size-10 stroke-1 text-white" />
            </div>
            <p className="text-sm">Galery</p>
          </div>
          <div className="flex flex-col items-center gap-1 text-white">
            <div className="bg-orange flex size-16 items-center justify-center rounded-[10px] border border-white drop-shadow-md">
              <Code2 className="size-10 stroke-1 text-white" />
            </div>
            <p className="text-sm">Code</p>
          </div>
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2">
        <Sun className="absolute right-0 bottom-0 -translate-y-32 md:right-1/4 lg:bottom-46" />
        <City3
          theme={theme}
          className="absolute bottom-0 left-0 w-[43.75rem] -translate-y-20 md:left-1/2 md:w-4/6 md:-translate-x-1/2 md:-translate-y-8 lg:-translate-y-20"
        />
        <City2
          theme={theme}
          className="absolute bottom-0 left-1/2 w-[55rem] -translate-x-[68%] -translate-y-12 md:w-4/6 md:-translate-x-1/2 lg:-translate-y-20"
        />
        <City1
          theme={theme}
          className="absolute bottom-0 left-1/2 w-[37.5rem] -translate-x-1/2 -translate-y-[3.5rem] md:w-4/6 lg:-translate-y-19"
        />
        <Ground theme={theme} className="relative z-50" />
      </div>
    </div>
  );
}
