import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaLocationDot, FaStar, FaRotateLeft, FaTag, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useDebounce } from "use-debounce";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setQuery, resetQuery } from "../../features/hotels/hotelSlice";
import { getHotels } from "../../services/hotelService";
import type { Hotel } from "../../types/hotel";

const LOCATIONS = [
  "Ahmedabad","Bengaluru","Chennai","Delhi","Goa",
  "Gurgaon","Hyderabad","Jaipur","Kolkata","Mumbai","Noida","Pune",
];

const Hero = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.hotels);
  const [search, setSearch] = useState(query.search ?? "");
  const [debouncedSearch] = useDebounce(search, 500);

  // Deals slider state
  const [deals, setDeals] = useState<Hotel[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    dispatch(setQuery({ search: debouncedSearch, skip: 0 }));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    setSearch(query.search ?? "");
  }, [query.search]);

  // Fetch cheapest hotels as "deals"
  useEffect(() => {
    getHotels({ ordering: "price", limit: 6, skip: 0 })
      .then((res) => setDeals(res.data))
      .catch(() => {});
  }, []);

  // Auto-slide every 3s
  useEffect(() => {
    if (!deals.length) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % deals.length), 3000);
    return () => clearInterval(t);
  }, [deals.length]);

  const prev = () => setCurrent((c) => (c - 1 + deals.length) % deals.length);
  const next = () => setCurrent((c) => (c + 1) % deals.length);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {/* Hero Image */}
      <img
        src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80"
        alt="Luxury hotel room"
        className="h-full w-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="absolute inset-0 flex flex-col items-center justify-start px-6 pt-6 gap-6">

        {/* ── Search bar ── */}
        <div className="w-full max-w-5xl">
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md">

            <div className="relative flex-1 min-w-[180px]">
              <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-sm" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search hotels or cities..."
                className="w-full rounded-full border border-white/20 bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder-white/50 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 backdrop-blur"
              />
            </div>

            <div className="relative">
              <FaLocationDot className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-sm" />
              <select
                value={query.location ?? ""}
                onChange={(e) => dispatch(setQuery({ location: e.target.value, skip: 0 }))}
                className="appearance-none rounded-full border border-white/20 bg-white/10 py-3 pl-10 pr-8 text-sm text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 backdrop-blur [&>option]:bg-slate-900 [&>option]:text-white"
              >
                <option value="">All Locations</option>
                {LOCATIONS.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <FaStar className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 text-sm" />
              <select
                value={query.rating_min ?? ""}
                onChange={(e) =>
                  dispatch(setQuery({ rating_min: e.target.value ? Number(e.target.value) : undefined, skip: 0 }))
                }
                className="appearance-none rounded-full border border-white/20 bg-white/10 py-3 pl-10 pr-8 text-sm text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 backdrop-blur [&>option]:bg-slate-900 [&>option]:text-white"
              >
                <option value="">Any Rating</option>
                <option value="5">5 ⭐</option>
                <option value="4">4+ ⭐</option>
                <option value="3">3+ ⭐</option>
              </select>
            </div>

            <select
              value={query.ordering ?? ""}
              onChange={(e) => dispatch(setQuery({ ordering: e.target.value, skip: 0 }))}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 backdrop-blur [&>option]:bg-slate-900 [&>option]:text-white"
            >
              <option value="">Sort By</option>
              <option value="price">Price ↑</option>
              <option value="-price">Price ↓</option>
              <option value="rating">Rating ↑</option>
              <option value="-rating">Rating ↓</option>
            </select>

            <button
              onClick={() => { setSearch(""); dispatch(resetQuery()); }}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-500/80 backdrop-blur"
            >
              <FaRotateLeft size={12} /> Reset
            </button>
          </div>
        </div>

        {/* ── Deals Slider ── */}
        {deals.length > 0 && (
          <div className="w-full max-w-2xl">
            {/* Label */}
            <div className="mb-3 flex items-center justify-center gap-2">
              <FaTag className="text-amber-400" />
              <span className="text-sm font-bold uppercase tracking-widest text-white">
                Today's Best Deals
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              {/* Slide */}
              <Link to={`/hotels/${deals[current].id}`} className="block">
                <img
                  src={deals[current].thumbnail}
                  alt={deals[current].name}
                  className="h-64 w-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-2xl" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-base font-black text-white line-clamp-1">{deals[current].name}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-slate-300">
                      <FaLocationDot className="text-amber-400" /> {deals[current].location}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-white">
                        <FaStar className="text-amber-400" /> {deals[current].rating}
                      </span>
                      <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-black text-white">
                        ₹{Number(deals[current].price).toLocaleString("en-IN")}/night
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Prev / Next */}
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/70 transition"
              >
                <FaChevronLeft size={12} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/70 transition"
              >
                <FaChevronRight size={12} />
              </button>
            </div>

            {/* Dots */}
            <div className="mt-3 flex justify-center gap-1.5">
              {deals.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-amber-400" : "w-1.5 bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
