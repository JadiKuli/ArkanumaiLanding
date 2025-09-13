"use client";
import { useState } from "react";
import Modal from "../modal";
import { userService } from "@/services/api/user-service";
import { toast } from "sonner";

export default function InputWalletModal({ onClose }: { onClose: () => void }) {
  const [wallet, setWallet] = useState<string>("");

  return (
    <Modal onClose={onClose}>
      <div className="relative w-[360px] rounded-xl bg-[#121212] p-6 text-white">
        <>
          <h2 className="mb-6 text-center text-lg font-semibold">
            Input Wallet
          </h2>

          <input
            type="text"
            className="w-full rounded-lg border border-gray-600 bg-gray-100 bg-transparent px-2 py-3"
            placeholder="Input Wallet Address Here"
            onChange={(e) => setWallet(e.target.value)}
            value={wallet}
          />

          <button
            className="mt-6 w-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400 py-3 hover:opacity-90 disabled:opacity-60"
            onClick={() => {
              userService
                .updateWallet({ walletId: wallet, source: "manual" })
                .then(() => {
                  toast.success("Wallet Updated Successfully!");
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                });
            }}
          >
            Continue
          </button>
        </>
      </div>
    </Modal>
  );
}
