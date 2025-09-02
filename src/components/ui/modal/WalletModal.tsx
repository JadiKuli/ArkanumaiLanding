"use client";
import { X } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useEffect, useState } from "react";
import Modal from "../modal";

interface WalletOption {
  id: "metamask" | "walletconnect";
  name: string;
  icon: string;
}

const wallets: WalletOption[] = [
  { id: "metamask", name: "MetaMask", icon: "/icon/metamask.png" },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "/icon/walletconnect.png",
  },
];

export default function WalletModal({ onClose }: { onClose: () => void }) {
  const {
    setWallet,
    wallet,
    connect,
    ModalOpen,
    isConnected,
    disconnect,
    connected,
  } = useWallet();
  const [pendingClose, setPendingClose] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (pendingClose && !ModalOpen) {
      onClose();
      setPendingClose(false);
    }
  }, [pendingClose, ModalOpen, onClose]);

  const handleContinue = () => {
    connect();
    setPendingClose(true);
  };

  const OptionWallet = () => {
    return (
      <>
        <h2 className="mb-6 text-center text-lg font-semibold">
          Choose a Wallet
        </h2>

        <div className="space-y-3">
          {wallets.map((walletOption) => (
            <button
              key={walletOption.id}
              className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 ${
                wallet === walletOption.id
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-gray-700 bg-black/20 hover:bg-black/40"
              }`}
              onClick={() => setWallet(walletOption.id)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={walletOption.icon}
                  alt={walletOption.name}
                  className="h-6 w-6"
                />
                <span>{walletOption.name}</span>
              </div>
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  wallet === walletOption.id
                    ? "border-purple-500"
                    : "border-gray-600"
                }`}
              >
                {wallet === walletOption.id && (
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        <button
          className="mt-6 w-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400 py-3 hover:opacity-90 disabled:opacity-60"
          onClick={handleContinue}
          disabled={ModalOpen}
        >
          Continue
        </button>
      </>
    );
  };

  const WalletConnected = () => {
    return (
      <>
        <h2 className="mb-6 text-center text-lg font-semibold">
          Wallet Connected
        </h2>
        {isConnected && (
          <div className="flex flex-col items-center">
            <img src="/icon/walletconnect.png" alt="" className="h-24 w-24" />
            <p className="mt-2 text-sm font-semibold">
              Connected with WalletConnect
            </p>
          </div>
        )}
        {connected && (
          <div className="flex flex-col items-center">
            <img src="/icon/metamask.png" alt="" className="h-24 w-24" />
            <p className="mt-2 text-sm font-semibold">
              Connected with Metamask
            </p>
          </div>
        )}
        <button
          className="mt-6 w-full rounded-full bg-pink-600 py-3 hover:opacity-90 disabled:opacity-60 cursor-pointer"
          onClick={() => {
            if (isConnected) {
              console.log("Halo");
              setWallet("walletconnect");
            } else {
              setWallet("metamask");
            }
            setConfirm(true);
            disconnect();
          }}
          disabled={ModalOpen}
        >
          {confirm ? "Confirm Disconnect" : "Disconnect"}
        </button>
      </>
    );
  };

  return (
    <Modal
      onClose={() => {
        if (!ModalOpen) onClose();
      }}
    >
      <div className="relative w-[360px] rounded-xl bg-[#121212] p-6 text-white">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={() => {
            if (!ModalOpen) onClose();
          }}
          disabled={ModalOpen}
        >
          <X size={20} />
        </button>

        {isConnected || connected ? <WalletConnected /> : <OptionWallet />}
      </div>
    </Modal>
  );
}
