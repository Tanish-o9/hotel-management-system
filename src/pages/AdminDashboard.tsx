import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHotel, FaCalendar, FaUsers, FaRupeeSign, FaCheckCircle, FaBan, FaMapMarkerAlt } from "react-icons/fa";
import Layout from "../components/layout/Layout";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { cancelBooking } from "../features/bookings/bookingsSlice";
import { addNotification } from "../features/notifications/notificationsSlice";
import { getHotels } from "../services/hotelService";

const ADMIN_EMAIL = "admin@findmyhotel.com";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const bookings = useAppSelector((s) => s.bookings.items);
  const [totalHotels, setTotalHotels] = useState(0);
  const [tab, setTab] = useState<"overview" | "bookings">("overview");

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) { navigate("/"); return; }
    getHotels({ limit: 1, skip: 0 }).then((r) => setTotalHotels(r.count));
  }, [user, navigate]);

  if (!user || user.email !== ADMIN_EMAIL) return null;

  const totalRevenue = bookings.filter(b => b.status === "confirmed").reduce((s, b) => s + b.totalPrice, 0);
  const confirmed = bookings.filter(b => b.status === "confirmed").length;
  const cancelled = bookings.filter(b => b.status === "cancelled").length;

  const handleCancel = (id: string) => {
    dispatch(cancelBooking(id));
    dispatch(addNotification({ message: "Booking cancelled by admin.", type: "info" }));
  };

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage hotels and bookings</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total Hotels", value: totalHotels, icon: <FaHotel className="text-blue-500" />, bg: "bg-blue-50 dark:bg-blue-900/20" },
            { label: "Total Bookings", value: bookings.length, icon: <FaCalendar className="text-amber-500" />, bg: "bg-amber-50 dark:bg-amber-900/20" },
            { label: "Confirmed", value: confirmed, icon: <FaCheckCircle className="text-green-500" />, bg: "bg-green-50 dark:bg-green-900/20" },
            { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: <FaRupeeSign className="text-purple-500" />, bg: "bg-purple-50 dark:bg-purple-900/20" },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl border border-slate-100 p-5 dark:border-slate-700 ${s.bg}`}>
              <div className="mb-2 text-xl">{s.icon}</div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-slate-200 dark:border-slate-700">
          {(["overview", "bookings"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-semibold capitalize transition border-b-2 -mb-px ${tab === t ? "border-amber-500 text-amber-600" : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400"}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-4 font-bold text-slate-900 dark:text-white flex items-center gap-2"><FaUsers /> Booking Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm"><span className="text-slate-500">Confirmed</span><span className="font-bold text-green-600">{confirmed}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500">Cancelled</span><span className="font-bold text-red-500">{cancelled}</span></div>
                <div className="flex justify-between text-sm border-t pt-3 dark:border-slate-700"><span className="text-slate-500">Total Revenue</span><span className="font-black text-amber-600">₹{totalRevenue.toLocaleString("en-IN")}</span></div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-4 font-bold text-slate-900 dark:text-white flex items-center gap-2"><FaHotel /> Recent Bookings</h3>
              {bookings.slice(0, 4).map((b) => (
                <div key={b.id} className="flex items-center justify-between border-b py-2 last:border-0 dark:border-slate-700">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{b.hotelName}</p>
                    <p className="text-xs text-slate-500">{b.checkIn} → {b.checkOut}</p>
                  </div>
                  <span className={`text-xs font-bold ${b.status === "confirmed" ? "text-green-600" : "text-red-500"}`}>{b.status}</span>
                </div>
              ))}
              {bookings.length === 0 && <p className="text-sm text-slate-500">No bookings yet</p>}
            </div>
          </div>
        )}

        {tab === "bookings" && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <p className="py-12 text-center text-slate-500">No bookings found</p>
            ) : bookings.map((b) => (
              <div key={b.id} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                <img src={b.hotelImage} alt={b.hotelName} className="h-20 w-28 rounded-xl object-cover shrink-0" />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{b.hotelName}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-500"><FaMapMarkerAlt className="text-amber-500" /> {b.location}</p>
                      <p className="mt-1 text-xs text-slate-400">📅 {b.checkIn} → {b.checkOut} · 👥 {b.guests} · 🛏 {b.room}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${b.status === "confirmed" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-600"}`}>
                      {b.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-black text-amber-600">₹{b.totalPrice.toLocaleString("en-IN")}</p>
                    {b.status === "confirmed" && (
                      <button onClick={() => handleCancel(b.id)}
                        className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 dark:border-red-800">
                        <FaBan size={10} /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default AdminDashboard;
