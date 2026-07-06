// frontend/services/notifications/notificationService.ts

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

/* ======================================================
   Notification Configuration
====================================================== */

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class NotificationService {
  /* ==========================================
     Permissions
  ========================================== */

  async requestPermissions() {
    if (!Device.isDevice) {
      throw new Error(
        "Notifications require a physical device."
      );
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } =
        await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      throw new Error(
        "Notification permission was denied."
      );
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync(
        "default",
        {
          name: "Default",
          importance:
            Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#2563EB",
        }
      );
    }

    return true;
  }

  /* ==========================================
     Push Token
  ========================================== */

  async getExpoPushToken() {
    const token =
      await Notifications.getExpoPushTokenAsync();

    return token.data;
  }

  /* ==========================================
     Local Notifications
  ========================================== */

  async sendLocalNotification(
    title: string,
    body: string,
    data: Record<string, unknown> = {}
  ) {
    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: null,
    });
  }

  async scheduleNotification(
    title: string,
    body: string,
    seconds: number,
    data: Record<string, unknown> = {}
  ) {
    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds,
      },
    });
  }

  /* ==========================================
     Badge
  ========================================== */

  async setBadgeCount(count: number) {
    await Notifications.setBadgeCountAsync(count);
  }

  async clearBadge() {
    await Notifications.setBadgeCountAsync(0);
  }

  /* ==========================================
     Cancel Notifications
  ========================================== */

  async cancelNotification(id: string) {
    await Notifications.cancelScheduledNotificationAsync(
      id
    );
  }

  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  /* ==========================================
     Listeners
  ========================================== */

  addNotificationReceivedListener(
    callback: (
      notification: Notifications.Notification
    ) => void
  ) {
    return Notifications.addNotificationReceivedListener(
      callback
    );
  }

  addNotificationResponseListener(
    callback: (
      response: Notifications.NotificationResponse
    ) => void
  ) {
    return Notifications.addNotificationResponseReceivedListener(
      callback
    );
  }

  removeListener(
    subscription: Notifications.EventSubscription
  ) {
    subscription.remove();
  }
}

const notificationService =
  new NotificationService();

export default notificationService;