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
import { IoMdLogIn } from "react-icons/io";
import LoginCard from "@/components/elements/logincard";
import { userService } from "@/services/api/user-service";
import RegisterCard from "@/components/elements/registercard";
import { toast } from "sonner";
import ProfileCard from "@/components/elements/profilecard";
import { authService } from "@/services/api/auth-service";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [theme, setTheme] = useState("dark");
  const { dateBirth, setDateBirth } = useBirthDate();
  const [showGift, setShowGift] = useState(false);
  const [showDateCard, setShowDateCard] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showLogin, setShowLogin] = useState<string | null>();
  const [data, setData] = useState<{
    username: string;
    UserWallet: {
      coins: number;
      walletId: string;
    };
    _count: {
      Post: number;
      Likes: number;
      Comment: number;
    };
  }>();
  const [isProfile, setIsProfile] = useState(false);

  const handlesetDateBirth = (date: string) => {
    setDateBirth(date);
    setShowGift(true);
    setShowDateCard(false);
  };

  const params = new URLSearchParams(window.location.search);
  const isRequiredLogin = params.get("login");

  useEffect(() => {
    const userCheck = async () => {
      try {
        const res = await userService.me();

        if (res.data) {
          setIsLogin(true);
          setData(res.data);
        }
      } catch (error) {
        setIsLogin(false);
        console.error(error);
      }
    };

    userCheck();
  }, []);

  useEffect(() => {
    if (isRequiredLogin) {
      toast.error("Please login to access this page.");
      setShowLogin("login");
    }
  }, [isRequiredLogin]);

  return (
    <div
      className={`relative h-screen w-full overflow-hidden transition duration-500 ${theme === "dark" ? "from-night-1 to-night-blue bg-gradient-to-b" : "to-day-5 from-day-white bg-gradient-to-b"} `}
    >
      {showGift && dateBirth && <Gift birthDate={dateBirth} />}
      <div className="fixed top-6 left-6 z-50 flex gap-2">
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
      {isLogin ? (
        <div
          className="fixed top-6 right-6 z-50"
          onClick={() => setIsProfile(!isProfile)}
        >
          <div className="group hover:text-night-1 hover:bg-night-blue hover:border-night-blue flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white px-4 py-2 text-center font-semibold text-white transition duration-300 hover:text-white">
            <span className="group-hover:invisible">Hi! {data?.username}</span>
            <span className="invisible absolute group-hover:visible">
              Profile
            </span>
          </div>
        </div>
      ) : (
        <div
          className="hover:text-night-1 fixed top-6 right-6 z-50 flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white px-4 py-2 font-semibold text-white transition duration-300 hover:bg-white"
          onClick={() => setShowLogin("login")}
        >
          <IoMdLogIn size={24} />
          Login User
        </div>
      )}
      {showDateCard && (
        <div className="fixed inset-0 z-[60] flex h-full w-full items-center justify-center backdrop-blur-sm">
          <DateCard handleSetDateBirth={handlesetDateBirth} />
        </div>
      )}
      {showLogin && (
        <div className="fixed inset-0 z-[60] flex h-full w-full items-center justify-center backdrop-blur-sm">
          {showLogin === "login" ? (
            <LoginCard
              onClose={() => setShowLogin(null)}
              onRegister={() => setShowLogin("register")}
            />
          ) : (
            <RegisterCard
              onClose={() => setShowLogin(null)}
              onLogin={() => setShowLogin("login")}
            />
          )}
        </div>
      )}
      {isProfile && (
        <div className="absolute top-20 right-4 z-[60] flex h-[525px] w-92 items-center justify-center rounded-lg border border-[1px] border-slate-200 backdrop-blur-sm">
          <ProfileCard
            onLogout={() => {
              authService.logout();

              toast.success("Logout Successfully!");
              setTimeout(() => {
                window.location.href = "/";
              }, 1500);
            }}
            data={data}
          />
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
