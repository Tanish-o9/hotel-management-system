import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../features/hotels/hotelSlice";
import authReducer from "../features/auth/authSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import bookingsReducer from "../features/bookings/bookingsSlice";

export const store = configureStore({
  reducer: {
    hotels: hotelReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    notifications: notificationsReducer,
    bookings: bookingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
