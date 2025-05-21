import Sun from "../atom/sun";
import City3 from "../atom/city3";
import City2 from "../atom/city2";
import City1 from "../atom/city1";
import Ground from "../atom/ground";
import Building from "../atom/building";

const Background = ({ theme = "dark" }: { theme: string }) => {
  return (
    <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2">
      <Sun
        className={`absolute right-4 bottom-40 size-[8.75rem] transition duration-500 md:right-1/4 md:size-20 lg:right-1/5 lg:bottom-64 lg:size-32 ${theme === "dark" ? "" : "translate-x-[500px] translate-y-[500px]"}`}
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
  );
};

export default Background;
