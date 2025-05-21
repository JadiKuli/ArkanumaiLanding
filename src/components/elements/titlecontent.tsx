import { useEffect, useState } from "react";

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
  );
};

export default TitleContent;
