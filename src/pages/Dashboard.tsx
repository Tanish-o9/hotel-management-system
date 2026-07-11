import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaHeart, FaCalendar, FaSignOutAlt, FaMapMarkerAlt, FaCheckCircle, FaBan } from "react-icons/fa";
import Layout from "../components/layout/Layout";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { cancelBooking } from "../features/bookings/bookingsSlice";
import { addNotification } from "../features/notifications/notificationsSlice";
import { auth, signOut } from "../services/firebase";

const tabs = ["Profile", "Bookings", "Wishlist"] as const;
type Tab = typeof tabs[number];

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const bookings = useAppSelector((s) => s.bookings.items);
  const wishlistIds = useAppSelector((s) => s.wishlist.ids);
  const [tab, setTab] = useState<Tab>("Profile");

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const handleLogout = () => {
    signOut(auth).catch(() => {});
    dispatch(logout());
    dispatch(addNotification({ message: "Signed out successfully.", type: "info" }));
    navigate("/");
  };

  const handleCancel = (id: string) => {
    dispatch(cancelBooking(id));
    dispatch(addNotification({ message: "Booking cancelled.", type: "info" }));
  };

  if (!user) return null;

  return (
    <Layout>
      <section className="min-h-screen bg-slate-950 px-6 py-12">
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {user.photoURL
                ? <img src={user.photoURL} className="h-16 w-16 rounded-full border-4 border-amber-500 object-cover" />
                : <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-2xl font-black text-white">{user.name[0]}</div>
              }
              <div>
                <h1 className="text-2xl font-black text-white">{user.name}</h1>
                <p className="text-sm text-slate-400">{user.email}</p>
                {user.emailVerified && (
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-green-900/40 px-2 py-0.5 text-xs font-semibold text-green-400">
                    <FaCheckCircle size={10} /> Verified
                  </span>
                )}
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 rounded-xl border border-red-500/40 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10">
              <FaSignOutAlt /> Sign Out
            </button>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            {[
              { label: "Total Bookings", value: bookings.length, icon: <FaCalendar className="text-amber-500" /> },
              { label: "Saved Hotels", value: wishlistIds.length, icon: <FaHeart className="text-red-500" /> },
              { label: "Confirmed", value: bookings.filter(b => b.status === "confirmed").length, icon: <FaCheckCircle className="text-green-500" /> },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
                <div className="mb-2">{s.icon}</div>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-2 border-b border-slate-700">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-sm font-semibold transition border-b-2 -mb-px ${tab === t ? "border-amber-500 text-amber-400" : "border-transparent text-slate-400 hover:text-white"}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {tab === "Profile" && (
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 space-y-4">
              {[
                { label: "Full Name", value: user.name, icon: <FaUser size={14} /> },
                { label: "Email Address", value: user.email, icon: <FaUser size={14} /> },
                { label: "Account Type", value: user.photoURL ? "Google Account" : "Email & Password", icon: <FaUser size={14} /> },
                { label: "Email Verified", value: user.emailVerified ? "Yes ✅" : "No ❌", icon: <FaCheckCircle size={14} /> },
              ].map((f) => (
                <div key={f.label} className="flex items-center justify-between border-b border-slate-700 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 text-slate-400">
                    {f.icon}
                    <span className="text-sm">{f.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{f.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Bookings Tab */}
          {tab === "Bookings" && (
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="flex flex-col items-center py-20 text-center">
                  <FaCalendar className="mb-4 text-5xl text-slate-600" />
                  <p className="text-lg font-semibold text-slate-400">No bookings yet</p>
                  <Link to="/" className="mt-4 rounded-full bg-amber-600 px-6 py-2 text-sm font-semibold text-white hover:bg-amber-500">Explore Hotels</Link>
                </div>
              ) : bookings.map((b) => (
                <div key={b.id} className="flex gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-4">
                  <img src={b.hotelImage} alt={b.hotelName} className="h-24 w-32 rounded-xl object-cover shrink-0" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-white">{b.hotelName}</p>
                          <p className="flex items-center gap-1 text-xs text-slate-400"><FaMapMarkerAlt className="text-amber-500" /> {b.location}</p>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${b.status === "confirmed" ? "bg-green-900/40 text-green-400" : "bg-red-900/40 text-red-400"}`}>
                          {b.status === "confirmed" ? "Confirmed" : "Cancelled"}
                        </span>
                      </div>
                      <div className="mt-2 flex gap-4 text-xs text-slate-400">
                        <span>📅 {b.checkIn} → {b.checkOut}</span>
                        <span>👥 {b.guests} guest{b.guests > 1 ? "s" : ""}</span>
                        <span>🛏 {b.room}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-black text-amber-500">₹{b.totalPrice.toLocaleString("en-IN")}</p>
                      {b.status === "confirmed" && (
                        <button onClick={() => handleCancel(b.id)}
                          className="flex items-center gap-1 rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10">
                          <FaBan size={10} /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Wishlist Tab */}
          {tab === "Wishlist" && (
            <div className="flex flex-col items-center py-20 text-center">
              <FaHeart className="mb-4 text-5xl text-red-400" />
              <p className="text-lg font-semibold text-slate-400">{wishlistIds.length} saved hotel{wishlistIds.length !== 1 ? "s" : ""}</p>
              <Link to="/wishlist" className="mt-4 rounded-full bg-amber-600 px-6 py-2 text-sm font-semibold text-white hover:bg-amber-500">View Wishlist</Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
