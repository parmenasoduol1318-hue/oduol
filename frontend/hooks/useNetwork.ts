import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { logger } from "../lib/logger";

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: string | null;
}

export const useNetwork = (): NetworkState => {
  const [state, setState] = useState<NetworkState>({
    isConnected: true,
    isInternetReachable: true,
    type: null,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((netState) => {
      const newState: NetworkState = {
        isConnected: !!netState.isConnected,
        isInternetReachable: netState.isInternetReachable,
        type: netState.type,
      };

      setState(newState);

      logger.info("Network state changed", newState);
    });

    return () => unsubscribe();
  }, []);

  return state;
};