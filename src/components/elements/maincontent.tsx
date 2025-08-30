import type { IconName } from "lucide-react/dynamic";
import Icon from "../atom/icon";

interface DataIconsProps {
  label: string;
  name: IconName;
  onClick?: () => void;
}

const MainContent = () => {
  const DATA_ICONS: DataIconsProps[] = [
    {
      label: "Music Generate",
      name: "music",
      onClick: () =>
        (window.location.href =
          "https://app.arcanumai.kuncipintu.my.id/ai?id=music"),
    },
    {
      label: "3D Generate",
      name: "image",
      onClick: () =>
        (window.location.href =
          "https://app.arcanumai.kuncipintu.my.id/ai?id=3d"),
    },
    {
      label: "Social Media",
      name: "handshake",
      onClick: () =>
        (window.location.href =
          "https://app.arcanumai.kuncipintu.my.id/social"),
    },
  ];

  return (
    <div className="grid grid-cols-3 justify-items-center gap-6">
      {DATA_ICONS.map((item, index) => (
        <div
          key={index}
          className="flex cursor-pointer flex-col items-center gap-1 text-white"
          onClick={item.onClick}
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
