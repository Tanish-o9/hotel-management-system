import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaLocationDot } from "react-icons/fa6";
import { useAppSelector } from "../../app/hooks";
import { getHotels } from "../../services/hotelService";
import type { Hotel } from "../../types/hotel";

const Recommendations = () => {
  const location = useAppSelector((state) => state.hotels.query.location ?? "");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getHotels({
      location: location || undefined,
      ordering: "-rating",
      limit: 4,
      skip: 0,
    })
      .then((res) => setHotels(res.data))
      .catch(() => setHotels([]))
      .finally(() => setLoading(false));
  }, [location]);

  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Recommendations
          {location && (
            <span className="ml-3 text-xl font-semibold text-amber-600">— {location}</span>
          )}
        </h2>
        <p className="mt-2 mb-8 text-sm text-slate-500 dark:text-slate-400">
          {location
            ? `Top rated stays in ${location}`
            : "Top rated stays across India's finest destinations"}
        </p>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {hotels.map((hotel) => (
              <Link
                key={hotel.id}
                to={`/hotels/${hotel.id}`}
                className="group relative overflow-hidden rounded-2xl"
              >
                <img
                  src={hotel.thumbnail}
                  alt={hotel.name}
                  loading="lazy"
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="line-clamp-1 text-sm font-bold text-white">{hotel.name}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-slate-300">
                      <FaLocationDot className="text-amber-400" /> {hotel.location}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur">
                      <FaStar className="text-amber-400" /> {hotel.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Recommendations;
