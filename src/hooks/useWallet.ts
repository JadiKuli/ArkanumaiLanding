import { useState, useEffect } from "react";
import { useSDK } from "@metamask/sdk-react";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitState,
} from "@reown/appkit/react";
import { userService } from "@/services/api/user-service";

export function useWallet() {
  const [wallet, setWallet] = useState<string>("metamask");
  const { open } = useAppKit();
  const { address } = useAppKitAccount();
  const { sdk, account, connected } = useSDK();
  const { open: ModalOpen, initialized: ModalInitialized } = useAppKitState();

  const connect = async () => {
    if (wallet === "metamask") {
      try {
        await sdk?.connect();
      } catch (err) {
        console.warn(`No accounts found`, err);
      }
    }

    if (wallet === "walletconnect") {
      try {
        open({ view: "Connect" });
      } catch (error) {
        console.error("WalletConnect connection failed:", error);
      }
    }
  };

  const disconnect = async () => {
    if (wallet === "metamask") {
      sdk?.terminate();
    }

    if (wallet === "walletconnect") {
      // Add WalletConnect disconnection logic here if needed
    }
  };

  useEffect(() => {
    if (!account) return;

    const updateUserWallet = async () => {
      try {
        await userService.updateWallet({ walletId: account });
      } catch (err) {
        console.error("❌ Failed to update wallet:", err);
      }
    };

    updateUserWallet();
  }, [account]);

  useEffect(() => {
    if (!address) return;

    const updateUserWallet = async () => {
      try {
        await userService.updateWallet({ walletId: address });
      } catch (err) {
        console.error("❌ Failed to update wallet:", err);
      }
    };

    updateUserWallet();
  }, [address]);

  return {
    wallet,
    ModalOpen,
    ModalInitialized,
    setWallet,
    connect,
    disconnect,
    connected,
  };
}

export default useWallet;
