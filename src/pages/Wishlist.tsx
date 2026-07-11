import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import Layout from "../components/layout/Layout";
import HotelCard from "../components/hotel/HotelCard";
import { useAppSelector } from "../app/hooks";
import { getHotels } from "../services/hotelService";
import type { Hotel } from "../types/hotel";

const Wishlist = () => {
  const ids = useAppSelector((s) => s.wishlist.ids);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ids.length) { setLoading(false); return; }
    getHotels({ limit: 100, skip: 0 })
      .then((res) => setHotels(res.data.filter((h) => ids.includes(h.id))))
      .finally(() => setLoading(false));
  }, [ids]);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800">
          <FaArrowLeft /> Back
        </Link>
        <h1 className="mb-8 text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <FaHeart className="text-red-500" /> My Wishlist
        </h1>
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />
            ))}
          </div>
        ) : hotels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FaHeart className="mb-4 text-5xl text-slate-300" />
            <p className="text-lg font-semibold text-slate-500">No saved hotels yet</p>
            <Link to="/" className="mt-4 rounded-full bg-amber-600 px-6 py-2 text-sm font-semibold text-white hover:bg-amber-500">Explore Hotels</Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Wishlist;
