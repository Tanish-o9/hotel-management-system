import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun, FaHeart, FaBell, FaUser, FaSignOutAlt, FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openAuth, logout } from "../../features/auth/authSlice";
import { useDarkMode } from "../../context/DarkModeContext";
import { addNotification, removeNotification } from "../../features/notifications/notificationsSlice";
import { auth, signOut } from "../../services/firebase";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const { dark, toggle } = useDarkMode();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const wishlistCount = useAppSelector((s) => s.wishlist.ids.length);
  const notifs = useAppSelector((s) => s.notifications.items);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close notif dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setShowNotifs(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    signOut(auth).catch(() => {});
    dispatch(logout());
    dispatch(addNotification({ message: "Signed out successfully.", type: "info" }));
    navigate("/");
  };

  const handleWishlist = () => {
    if (!user) { dispatch(openAuth("login")); return; }
    navigate("/wishlist");
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 dark:bg-slate-950 border-b border-slate-700">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link to="/" className="text-3xl font-black tracking-tight text-white mr-auto">Find My Hotel</Link>

        <div className="hidden items-center gap-3 md:flex">

          {/* Wishlist */}
          <button onClick={handleWishlist} className="relative rounded-full p-2 text-white/70 transition hover:bg-slate-700 hover:text-white">
            <FaHeart size={16} />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{wishlistCount}</span>
            )}
          </button>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button onClick={() => setShowNotifs(!showNotifs)} className="relative rounded-full p-2 text-white/70 transition hover:bg-slate-700 hover:text-white">
              <FaBell size={16} />
              {notifs.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">{notifs.length}</span>
              )}
            </button>
            {showNotifs && (
              <div className="absolute right-0 top-12 w-80 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
                  <p className="text-sm font-bold text-white">Notifications</p>
                  {notifs.length > 0 && (
                    <button onClick={() => notifs.forEach(n => dispatch(removeNotification(n.id)))}
                      className="text-xs text-slate-400 hover:text-red-400">Clear all</button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifs.length === 0 ? (
                    <p className="px-4 py-6 text-center text-sm text-slate-500">No notifications</p>
                  ) : (
                    notifs.map((n) => (
                      <div key={n.id} className="flex items-start gap-3 border-b border-slate-800 px-4 py-3 last:border-0">
                        <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${n.type === "success" ? "bg-green-500" : n.type === "error" ? "bg-red-500" : "bg-blue-500"}`} />
                        <p className="flex-1 text-sm text-slate-300">{n.message}</p>
                        <button onClick={() => dispatch(removeNotification(n.id))} className="text-slate-600 hover:text-red-400">
                          <FaTrash size={10} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <button onClick={() => navigate("/dashboard")}
                className="flex items-center gap-1.5 rounded-full bg-slate-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-600 transition">
                {user.photoURL
                  ? <img src={user.photoURL} className="h-5 w-5 rounded-full" />
                  : <FaUser size={12} />
                }
                {user.name}
              </button>
              <button onClick={handleLogout} title="Sign Out" className="rounded-full p-2 text-white/60 hover:text-red-400 transition">
                <FaSignOutAlt size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => dispatch(openAuth("login"))} className="text-sm font-medium text-white/80 transition hover:text-amber-400">Sign In</button>
              <button onClick={() => dispatch(openAuth("register"))} className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-500">Register</button>
            </div>
          )}

          {/* Dark Mode */}
          <button onClick={toggle} title="Toggle theme" className="rounded-full p-2 text-white/70 transition hover:bg-slate-700 hover:text-white">
            {dark ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white md:hidden">
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-slate-700 bg-slate-900 px-6 py-4 space-y-3 md:hidden">
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="rounded-full border border-slate-600 px-3 py-2 text-sm text-white">{dark ? "☀️ Light" : "🌙 Dark"}</button>
            {user ? (
              <button onClick={handleLogout} className="text-sm font-medium text-red-400">Sign Out</button>
            ) : (
              <button onClick={() => { dispatch(openAuth("login")); setIsOpen(false); }} className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white">Sign In</button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
