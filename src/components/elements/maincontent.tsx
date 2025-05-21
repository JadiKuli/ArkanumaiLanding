import type { IconName } from "lucide-react/dynamic";
import Icon from "../atom/icon";
import { useNavigate } from "@tanstack/react-router";

interface DataIconsProps {
  label: string;
  name: IconName;
  onClick?: () => void;
}

const MainContent = () => {
  const navigate = useNavigate({ from: "/" });

  const DATA_ICONS: DataIconsProps[] = [
    { label: "Image to Ghibli", name: "image" },
    { label: "Image to Disney", name: "castle" },
    { label: "Image to Anime", name: "japanese-yen" },
    { label: "Image to Cyberpunk", name: "circuit-board" },
  ];

  const handleClick = () => {
    navigate({ to: "/coming-soon" });
  };

  return (
    <div className="grid grid-cols-4 justify-items-center gap-6">
      {DATA_ICONS.map((item, index) => (
        <div
          key={index}
          className="flex cursor-pointer flex-col items-center gap-1 text-white"
          onClick={handleClick}
        >
          <div
            className={`flex size-16 items-center justify-center rounded-[10px] border-t-[1px] border-white bg-white/10 shadow-md backdrop-blur-lg`}
          >
            <Icon
              name={item.name}
              className={`stroke-day-5 drop-shadow-background size-10 stroke-[1.5] lg:stroke-white`}
            />
          </div>
          <p className="font-lexend text-center text-[14px] text-white text-shadow-sm">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
