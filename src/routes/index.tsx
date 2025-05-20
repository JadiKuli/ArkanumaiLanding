import { createFileRoute } from "@tanstack/react-router";
import City1 from "@/components/atom/city1";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import City2 from "@/components/atom/city2";
import City3 from "@/components/atom/city3";
import Sun from "@/components/atom/sun";
import Ground from "@/components/atom/ground";
import { motion } from "motion/react";
import CometBackground from "@/components/atom/comet";
import type { IconName } from "lucide-react/dynamic";
import Icon from "@/components/atom/icon";
import Building from "@/components/atom/building";

export const Route = createFileRoute("/")({
  component: Index,
});

interface DataIconsProps {
  label: string;
  name: IconName;
  onClick?: () => void;
}

function Index() {
  const [theme, setTheme] = useState("dark");

  const DATA_ICONS: DataIconsProps[] = [
    { label: "Folder", name: "activity" },
    { label: "Message", name: "message-circle" },
    { label: "File", name: "file-text" },
    { label: "Game", name: "gamepad" },
    { label: "Book", name: "book-image" },
    { label: "Code", name: "code-2" },
  ];
  const [time, setTime] = useState("");
  const [dateInfo, setDateInfo] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [location, setLocation] = useState({
    city: "",
    country: "",
    locale: navigator.language || "en-US",
  });

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const localeFromIP = `${data.languages?.split(",")[0] || "en"}-${data.country}`;
        setLocation({
          city: data.city,
          country: data.country_name,
          locale: localeFromIP,
        });
      })
      .catch((err) => {
        console.error("Gagal mendapatkan lokasi:", err);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString(location.locale, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const formattedDate = now.toLocaleDateString(location.locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const [day, month, year] = formattedDate.split(" ");

      setTime(timeString.replace(".", ":"));
      setDateInfo({ day, month, year });
    }, 1000);

    return () => clearInterval(interval);
  }, [location.locale]);

  return (
    <div
      className={`relative h-screen w-full overflow-hidden transition duration-1000 ${theme === "dark" ? "from-night-1 to-night-blue bg-gradient-to-b" : "to-day-5 from-day-white bg-gradient-to-b"} `}
    >
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Switch
          id="theme"
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
      </div>
      <CometBackground />
      <motion.div
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 5 }}
        initial={{ scale: 0 }}
        className="absolute top-1/2 left-1/2 z-40 flex w-full -translate-x-1/2 -translate-y-2/3 flex-col gap-10 p-8 md:w-2/3 lg:w-1/2 lg:pt-16"
      >
        <div className="flex flex-col items-center gap-3 lg:gap-5">
          <h4
            className={`font-lexend text-[40px] transition duration-1000 lg:text-5xl ${theme === "dark" ? "text-white" : "text-day-5"}`}
          >
            {time}
          </h4>
          <h1
            className={`font-viga text-center text-[48px] transition duration-1000 lg:text-7xl ${theme === "dark" ? "text-white" : "text-day-5"}`}
          >
            Example_AI
          </h1>
          <div className="flex w-full flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-2">
              <h4
                className={`font-lexend px-2 transition duration-1000 lg:text-xl ${theme === "dark" ? "text-white" : "text-day-5"}`}
              >
                {location.city}, {location.country}
              </h4>
              <div
                className={`w-full border border-b-1 transition duration-1000 ${theme === "dark" ? "border-white" : "border-day-5"}`}
              />
            </div>
            <h4
              className={`font-lexend transition duration-1000 lg:text-xl ${theme === "dark" ? "text-white" : "text-day-5"}`}
            >
              {dateInfo.month} {dateInfo.day}, {dateInfo.year}
            </h4>
          </div>
        </div>
        <div className="grid grid-cols-4 justify-items-center gap-6 lg:grid-cols-5">
          {DATA_ICONS.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-1 text-white"
            >
              <div
                className={`flex size-16 items-center justify-center rounded-[10px] border-t-[1px] border-white bg-white/10 shadow-md backdrop-blur-lg`}
              >
                <Icon
                  name={item.name}
                  className={`stroke-day-5 drop-shadow-background size-10 stroke-[1.5] lg:stroke-white`}
                />
              </div>
              <p className="font-lexend text-[14px] text-white text-shadow-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2">
        <Sun
          className={`absolute right-4 bottom-40 size-[8.75rem] transition duration-1000 md:right-1/4 md:size-20 lg:right-1/5 lg:bottom-64 lg:size-32 ${theme === "dark" ? "" : "translate-x-[500px] translate-y-[500px]"}`}
        />
        <City3
          theme={theme}
          className="absolute bottom-24 left-0 w-[43.75rem] md:bottom-20 md:left-1/2 md:w-4/6 md:-translate-x-1/2 lg:bottom-24"
        />
        <City2
          theme={theme}
          className="absolute -right-16 bottom-10 w-[55rem] md:bottom-16 md:left-1/2 md:w-4/6 md:-translate-x-1/2 lg:bottom-20"
        />
        <City1
          theme={theme}
          className="absolute bottom-[3.85rem] left-1/2 w-[45rem] -translate-x-1/2 md:w-4/6 lg:bottom-[4.75rem]"
        />
        <Building
          theme={theme}
          className="absolute bottom-[3.75rem] left-24 w-[2.5rem] md:left-1/3 lg:bottom-[4.75rem]"
        />
        <Ground theme={theme} className="relative z-50" />
      </div>
    </div>
  );
}
