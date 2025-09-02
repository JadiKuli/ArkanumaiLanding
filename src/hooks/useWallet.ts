import { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitState,
  useDisconnect,
} from "@reown/appkit/react";
import { userService } from "@/services/api/user-service";

export function useWallet() {
  const [wallet, setWallet] = useState<string>("");
  const { open } = useAppKit();
  const { address, isConnected, status } = useAppKitAccount();
  const { disconnect: WagmiDisconnect } = useDisconnect();
  const { sdk, connected } = useSDK();
  const { open: ModalOpen, initialized: ModalInitialized } = useAppKitState();

  const [connectedState, setConnectedState] = useState(false);
  const [isConnectedState, setIsConnectedState] = useState(false);

  useEffect(() => {
    setConnectedState(!!connected);
    setIsConnectedState(!!isConnected);
  }, [connected, isConnected]);

  const connect = async () => {
    if (wallet === "metamask") {
      try {
        const res = await sdk?.connect();
        if (res?.[0]) {
          userService
            .updateWallet({ walletId: res[0] })
            .then(() => {
              window.location.reload();
            })
            .catch((err) => {
              console.error("❌ Failed to update wallet:", err);
            });
        }
      } catch (err) {
        console.warn(`No accounts found`, err);
      }
    }

    if (wallet === "walletconnect") {
      try {
        open({ view: "Connect" });

        console.log("address ", address);
        console.log("is connect ", isConnected);
        console.log("is connected status", status);
        if (address) {
          userService
            .updateWallet({ walletId: address })
            .then(() => {
              window.location.reload();
            })
            .catch((err) => {
              console.error("❌ Failed to update wallet:", err);
            });
        }
      } catch (error) {
        console.error("WalletConnect connection failed:", error);
      }
    }
  };

  const disconnect = async () => {
    try {
      if (wallet === "walletconnect") {
        WagmiDisconnect().then(() => {
          window.location.reload();
        });
      } else if (wallet === "metamask") {
        sdk?.terminate().then(() => {
          window.location.reload();
        });
      } else return;
    } catch (error) {
      console.error("WalletConnect disconnection failed:", error);
    } finally {
      localStorage.removeItem("address");
      await userService.updateWallet({ walletId: "default" });
    }
  };

  return {
    wallet,
    ModalOpen,
    ModalInitialized,
    setWallet,
    connect,
    disconnect,
    connected: connectedState,
    isConnected: isConnectedState,
  };
}

export default useWallet;
