import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NotificationItem, mockNotifications } from "../data/notifications";

interface NotificationState {
  notifications: NotificationItem[];
  addNotification: (notification: NotificationItem) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: mockNotifications,
      addNotification: (notification) => {
        set((state) => ({ notifications: [notification, ...state.notifications] }));
      },
      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        }));
      },
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },
      deleteNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },
      clearAll: () => {
        set({ notifications: [] });
      },
    }),
    {
      name: "career_ai_notifications",
    }
  )
);
