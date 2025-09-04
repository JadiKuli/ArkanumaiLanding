import { useEffect, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/id"; // Ubah jika ingin dukungan lokal lain

dayjs.extend(localizedFormat);

const TitleContent = ({ theme = "dark" }: { theme: string }) => {
  const [time, setTime] = useState("");
  const [dateInfo, setDateInfo] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [location, setLocation] = useState({
    city: "",
    country: "",
    locale: "en",
  });

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const localeFromIP = `${data.languages?.split(",")[0] || "en"}`;
        setLocation({
          city: data.city,
          country: data.country_name,
          locale: localeFromIP,
        });

        dayjs.locale(localeFromIP); // set locale untuk dayjs
      })
      .catch((err) => {
        console.error("Gagal mendapatkan lokasi:", err);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();

      setTime(now.format("HH:mm"));

      setDateInfo({
        day: now.format("D"),
        month: now.format("MMMM"),
        year: now.format("YYYY"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [location.locale]);

  return (
    <div className="flex flex-col items-center lg:gap-5">
      <h4
        className={`font-lexend text-[32px] transition duration-1000 lg:text-5xl ${
          theme === "dark" ? "text-white" : "text-day-5"
        }`}
      >
        {time}
      </h4>
      <h1
        className={`font-viga text-center text-[40px] transition duration-1000 lg:text-7xl ${
          theme === "dark" ? "text-white" : "text-day-5"
        }`}
      >
        ARCANUM AI
      </h1>
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <h4
            className={`font-lexend px-2 transition duration-1000 lg:text-xl ${
              theme === "dark" ? "text-white" : "text-day-5"
            }`}
          >
            {location.city}, {location.country}
          </h4>
          <div
            className={`w-full border border-b-1 transition duration-1000 ${
              theme === "dark" ? "border-white" : "border-day-5"
            }`}
          />
        </div>
        <h4
          className={`font-lexend transition duration-1000 lg:text-xl ${
            theme === "dark" ? "text-white" : "text-day-5"
          }`}
        >
          {dateInfo.month} {dateInfo.day}, {dateInfo.year}
        </h4>
      </div>
    </div>
  );
};

export default TitleContent;
