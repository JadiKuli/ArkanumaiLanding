import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { motion } from "motion/react";
import CometBackground from "@/components/atom/comet";
import Icon from "@/components/atom/icon";
import { Label } from "@/components/ui/label";
import Gift from "@/components/elements/gift";
import DateCard from "@/components/elements/datecard";
import TitleContent from "@/components/elements/titlecontent";
import MainContent from "@/components/elements/maincontent";
import Background from "@/components/elements/background";
import { useBirthDate } from "@/context/BirthDateContext";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [theme, setTheme] = useState("dark");
  const { dateBirth, setDateBirth } = useBirthDate();
  const [showGift, setShowGift] = useState(false);
  const [showDateCard, setShowDateCard] = useState(false);

  useEffect(() => {
    if (!dateBirth) {
      setTimeout(() => setShowDateCard(true), 3500);
    } else {
      setShowGift(true);
    }
  }, []);

  const handlesetDateBirth = (date: string) => {
    setDateBirth(date);
    setShowGift(true);
    setShowDateCard(false);
  };

  return (
    <div
      className={`relative h-screen w-full overflow-hidden transition duration-500 ${theme === "dark" ? "from-night-1 to-night-blue bg-gradient-to-b" : "to-day-5 from-day-white bg-gradient-to-b"} `}
    >
      {showGift && dateBirth && <Gift birthDate={dateBirth} />}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <Switch
          id="theme"
          checked={theme === "dark"}
          className="hidden"
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
        <Label htmlFor="theme">
          <Icon
            name={theme === "dark" ? "sun" : "moon"}
            size={25}
            className={`${theme === "dark" ? "stroke-white" : "stroke-day-5"}`}
          />
        </Label>
      </div>
      {showDateCard && (
        <div className="fixed inset-0 z-[60] flex h-full w-full items-center justify-center backdrop-blur-sm">
          <DateCard handleSetDateBirth={handlesetDateBirth} />
        </div>
      )}
      <CometBackground />
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        initial={{ opacity: 0 }}
        className="absolute top-1/2 left-1/2 z-40 flex w-full -translate-x-1/2 -translate-y-2/3 flex-col gap-10 p-8 md:w-2/3 lg:w-1/2 lg:pt-16"
      >
        <TitleContent theme={theme} />
        <MainContent />
      </motion.div>
      <Background theme={theme} />
    </div>
  );
}
