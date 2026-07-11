import { useEffect, useState } from "react";
import { FaMagnifyingGlass, FaLocationDot, FaStar, FaRotateLeft } from "react-icons/fa6";
import { useDebounce } from "use-debounce";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setQuery, resetQuery } from "../features/hotels/hotelSlice";
import { LOCATIONS, SORT_OPTIONS, RATING_OPTIONS } from "../utils/constants";

const SearchSection = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.hotels);
  const [search, setSearch] = useState(query.search ?? "");
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    dispatch(setQuery({ search: debouncedSearch, skip: 0 }));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    setSearch(query.search ?? "");
  }, [query.search]);

  return (
    <section className="sticky top-16 z-40 border-y border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-wrap items-center gap-3">

          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hotels or cities..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          {/* Location */}
          <div className="relative">
            <FaLocationDot className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <select
              value={query.location ?? ""}
              onChange={(e) => dispatch(setQuery({ location: e.target.value, skip: 0 }))}
              className="appearance-none rounded-full border border-slate-200 bg-slate-50 py-3 pl-10 pr-8 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            >
              <option value="">All Locations</option>
              {LOCATIONS.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div className="relative">
            <FaStar className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 text-sm" />
            <select
              value={query.rating_min ?? ""}
              onChange={(e) =>
                dispatch(setQuery({ rating_min: e.target.value ? Number(e.target.value) : undefined, skip: 0 }))
              }
              className="appearance-none rounded-full border border-slate-200 bg-slate-50 py-3 pl-10 pr-8 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            >
          {RATING_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
            </select>
          </div>

          {/* Sort */}
          <select
            value={query.ordering ?? ""}
            onChange={(e) => dispatch(setQuery({ ordering: e.target.value, skip: 0 }))}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
          </select>

          {/* Reset */}
          <button
            onClick={() => { setSearch(""); dispatch(resetQuery()); }}
            className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            <FaRotateLeft size={12} /> Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
