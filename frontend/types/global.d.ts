declare module "expo-clipboard" {
  export const setStringAsync: (value: string) => Promise<void>;
  export const getStringAsync: () => Promise<string>;
}

declare module "expo-sharing" {
  export const shareAsync: (url: string, options?: Record<string, unknown>) => Promise<void>;
}

declare module "expo-notifications" {
  export const AndroidImportance: { HIGH: 5 };
  export const setNotificationHandler: (handler: Record<string, unknown>) => void;
  export const getPermissionsAsync: () => Promise<{ status: string }>;
  export const requestPermissionsAsync: () => Promise<{ status: string }>;
  export const scheduleNotificationAsync: (payload: any) => Promise<string>;
  export const cancelAllScheduledNotificationsAsync: () => Promise<void>;
  export const setNotificationChannelAsync: (channelId: string, options: Record<string, unknown>) => Promise<void>;
  export const getExpoPushTokenAsync: () => Promise<{ data: string }>;
  export const setBadgeCountAsync: (count: number) => Promise<void>;
  export const cancelScheduledNotificationAsync: (id: string) => Promise<void>;
  export const addNotificationReceivedListener: (callback: (notification: any) => void) => { remove: () => void };
  export const addNotificationResponseReceivedListener: (callback: (response: any) => void) => { remove: () => void };
  export type Notification = any;
  export type NotificationResponse = any;
  export type EventSubscription = { remove: () => void };
  export type SchedulableTriggerInputTypes = { TIME_INTERVAL: "timeInterval" };
}

declare module "expo-device" {
  export const isDevice: boolean;
}

declare module "@react-native-community/netinfo" {
  const NetInfo: {
    addEventListener: (callback: (state: any) => void) => () => void;
  };
  export default NetInfo;
}

declare const jest: any;
declare const beforeEach: any;
