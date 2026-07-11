const FilterBar = () => {
  return (
    <section className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-4">

        <select className="rounded-xl border px-4 py-3 outline-none">
          <option>Location</option>
        </select>

        <select className="rounded-xl border px-4 py-3 outline-none">
          <option>Rating</option>
        </select>

        <select className="rounded-xl border px-4 py-3 outline-none">
          <option>Sort By</option>
        </select>

        <button className="ml-auto rounded-xl border px-5 py-3 hover:bg-slate-100">
          Reset
        </button>

      </div>
    </section>
  );
};

export default FilterBar;