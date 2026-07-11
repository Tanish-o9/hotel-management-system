const HotelSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border bg-white">

      <div className="h-72 bg-slate-200" />

      <div className="space-y-4 p-6">

        <div className="h-6 w-2/3 rounded bg-slate-200" />

        <div className="h-4 w-1/3 rounded bg-slate-200" />

        <div className="space-y-2">

          <div className="h-4 rounded bg-slate-200" />

          <div className="h-4 rounded bg-slate-200" />

          <div className="h-4 w-4/5 rounded bg-slate-200" />

        </div>

        <div className="mt-6 h-12 rounded-xl bg-slate-200" />

      </div>

    </div>
  );
};

export default HotelSkeleton;