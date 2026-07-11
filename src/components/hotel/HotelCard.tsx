import { Link } from "react-router-dom";
import { FaLocationDot, FaStar, FaArrowRight, FaHeart } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleWishlist } from "../../features/wishlist/wishlistSlice";
import { openAuth } from "../../features/auth/authSlice";
import { addNotification } from "../../features/notifications/notificationsSlice";
import type { Hotel } from "../../types/hotel";

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const isFav = useAppSelector((s) => s.wishlist.ids.includes(hotel.id));

  const handleWishlist = () => {
    if (!user) { dispatch(openAuth("login")); return; }
    dispatch(toggleWishlist(hotel.id));
    dispatch(addNotification({
      message: isFav ? `Removed ${hotel.name} from wishlist` : `Added ${hotel.name} to wishlist ❤️`,
      type: isFav ? "info" : "success",
    }));
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
      <div className="relative overflow-hidden">
        <img src={hotel.thumbnail} alt={hotel.name} loading="lazy"
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105" />

        {/* Wishlist */}
        <button onClick={handleWishlist}
          className={`absolute left-3 top-3 rounded-full p-2 shadow transition ${isFav ? "bg-red-500 text-white" : "bg-white text-slate-400 hover:text-red-500"}`}>
          <FaHeart size={14} />
        </button>

        {/* Rating */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow dark:bg-slate-900">
          <FaStar className="text-amber-400 text-xs" />
          <span className="text-sm font-bold text-slate-800 dark:text-white">{hotel.rating}</span>
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3 rounded-xl bg-white/95 px-3 py-1.5 shadow backdrop-blur dark:bg-slate-900/95">
          <p className="text-lg font-black text-amber-600">₹{Number(hotel.price).toLocaleString("en-IN")}</p>
          <span className="text-xs text-slate-500">per night</span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h2 className="line-clamp-1 text-lg font-bold text-slate-900 dark:text-white">{hotel.name}</h2>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <FaLocationDot className="text-amber-500 text-xs" />
            <span>{hotel.location}</span>
          </div>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{hotel.description}</p>
        <Link to={`/hotels/${hotel.id}`}
          className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500">
          <span>View Details</span>
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </article>
  );
};

export default HotelCard;
