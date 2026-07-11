import { useAppSelector } from "../../app/hooks";
import HotelCard from "./HotelCard";
import HotelSkeleton from "../HotelSkeleton";

const HotelGrid = () => {
  const { hotels, loading, error } = useAppSelector((state) => state.hotels);

  if (loading) {
    return (
      <section id="hotels" className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <div className="h-8 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-2 h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <HotelSkeleton key={i} />)}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  if (!hotels.length) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-slate-500 dark:text-slate-400">No hotels found. Try adjusting your filters.</p>
      </section>
    );
  }

  return (
    <section id="hotels" className="bg-white py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Our View</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{hotels.length} hotels available</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
        </div>
      </div>
    </section>
  );
};

export default HotelGrid;
