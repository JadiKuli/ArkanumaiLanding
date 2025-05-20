import type { FC } from "react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
  className?: string;
}

const Icon: FC<IconProps> = (props: IconProps) => <DynamicIcon {...props} />;

export default Icon;
