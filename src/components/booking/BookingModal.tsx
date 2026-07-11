import { useState } from "react";
import { FaTimes, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNotification } from "../../features/notifications/notificationsSlice";
import { openAuth } from "../../features/auth/authSlice";
import { addBooking } from "../../features/bookings/bookingsSlice";
import { nightsBetween } from "../../utils/helpers";

interface Props {
  hotelId: number;
  hotelName: string;
  hotelImage: string;
  location: string;
  price: number;
  onClose: () => void;
}

const BookingModal = ({ hotelId, hotelName, hotelImage, location, price, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [form, setForm] = useState({ checkIn: "", checkOut: "", guests: "1", room: "Standard" });

  const nights = nightsBetween(form.checkIn, form.checkOut);
  const total = nights * price;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { onClose(); dispatch(openAuth("login")); return; }
    dispatch(addBooking({
      id: Date.now().toString(),
      hotelId,
      hotelName,
      hotelImage,
      location,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: Number(form.guests),
      room: form.room,
      totalPrice: total,
      bookedAt: new Date().toISOString(),
      status: "confirmed",
    }));
    dispatch(addNotification({ message: `Booking confirmed at ${hotelName}! 🏨`, type: "success" }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><FaTimes /></button>
        <h2 className="mb-1 text-2xl font-black text-slate-900 dark:text-white">Book Your Stay</h2>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{hotelName}</p>
        <form onSubmit={handleBook} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400"><FaCalendarAlt size={10} /> Check-in</label>
              <input type="date" required value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </div>
            <div>
              <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400"><FaCalendarAlt size={10} /> Check-out</label>
              <input type="date" required value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400"><FaUser size={10} /> Guests</label>
              <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">Room Type</label>
              <select value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                <option>Standard</option><option>Deluxe</option><option>Suite</option><option>Premium Suite</option>
              </select>
            </div>
          </div>
          {nights > 0 && (
            <div className="rounded-xl bg-amber-50 p-4 dark:bg-slate-800">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>₹{price.toLocaleString("en-IN")} × {nights} night{nights > 1 ? "s" : ""}</span>
                <span className="font-bold text-amber-600">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          )}
          <button type="submit" className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500">
            {user ? "Confirm Booking" : "Sign in to Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
