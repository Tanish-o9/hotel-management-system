import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: number;
  message: string;
  type: "success" | "info" | "error";
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { items: [] as Notification[] },
  reducers: {
    addNotification(state, action: PayloadAction<Omit<Notification, "id">>) {
      state.items.push({ ...action.payload, id: Date.now() });
    },
    removeNotification(state, action: PayloadAction<number>) {
      state.items = state.items.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
