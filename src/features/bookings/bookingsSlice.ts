import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Booking {
  id: string;
  hotelId: number;
  hotelName: string;
  hotelImage: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  room: string;
  totalPrice: number;
  bookedAt: string;
  status: "confirmed" | "cancelled";
}

const stored: Booking[] = JSON.parse(localStorage.getItem("bookings") ?? "[]");

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: { items: stored },
  reducers: {
    addBooking(state, action: PayloadAction<Booking>) {
      state.items.unshift(action.payload);
      localStorage.setItem("bookings", JSON.stringify(state.items));
    },
    cancelBooking(state, action: PayloadAction<string>) {
      const b = state.items.find((b) => b.id === action.payload);
      if (b) b.status = "cancelled";
      localStorage.setItem("bookings", JSON.stringify(state.items));
    },
  },
});

export const { addBooking, cancelBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;
