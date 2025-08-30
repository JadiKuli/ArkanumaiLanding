import { userService } from "@/services/api/user-service";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfileCard(props: {
  onLogout?: () => void;
  data?: {
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
  };
}) {
  const [wallet, setWallet] = useState(props.data?.UserWallet.walletId);
  const handleUpdate = async () => {
    toast.info("Updating Wallet...");
    try {
      const res = await userService.updateWallet({
        walletId: wallet || "default",
      });
      if (res.status === 200) {
        toast.success("Wallet Updated Successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error("Something went wrong!, Please try again.");
      console.error(error);
    }
  };
  if (!props.data) return null;

  return (
    <div className="flex h-full w-full flex-col justify-between p-5 text-white">
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold">User Profile</h2>
        </div>
        <hr />
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold">Username</p>
            <h2>{props.data.username}</h2>
          </div>
          <div>
            <p className="text-sm font-semibold">Coins</p>
            <h2>{props.data.UserWallet.coins}</h2>
          </div>
          <div>
            <p className="text-sm font-semibold">Current Wallet</p>
            <h2>
              {props.data.UserWallet.walletId === "default"
                ? "-"
                : props.data.UserWallet.walletId}
            </h2>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-semibold">Posted</p>
              <h2>{props.data._count.Post}</h2>
            </div>
            <div>
              <p className="text-sm font-semibold">Liked</p>
              <h2>{props.data._count.Likes}</h2>
            </div>
            <div>
              <p className="text-sm font-semibold">Commented</p>
              <h2>{props.data._count.Comment}</h2>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Set Wallet</p>
          <div className="flex h-10 w-full items-center rounded-md border border-white">
            <input
              type="text"
              className="w-full px-3 outline-none"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />
          </div>
        </div>
        <button
          className="bg-night-3 w-full cursor-pointer rounded-md py-2"
          onClick={handleUpdate}
        >
          Update Wallet
        </button>
      </div>
      <button
        className="bg-pink w-full cursor-pointer rounded-md py-2"
        onClick={props.onLogout}
      >
        Logout
      </button>
    </div>
  );
}
