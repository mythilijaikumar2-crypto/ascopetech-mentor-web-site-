import { NotificationItem, mockNotifications } from "../data/notifications";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const notificationService = {
  getNotifications: async (): Promise<NotificationItem[]> => {
    await delay(400);
    return mockNotifications;
  },

  triggerMockNotification: (
    title: string,
    content: string,
    type: "info" | "success" | "warning" = "info"
  ): NotificationItem => {
    return {
      id: `not-${Math.random().toString(36).substr(2, 9)}`,
      title,
      content,
      timestamp: "Just now",
      read: false,
      type
    };
  }
};
