import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <section className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b">
      <div className="mx-auto max-w-7xl px-6 py-5">

        <div className="relative">

          <FaSearch
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search hotels or cities..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-4 text-slate-700 shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

        </div>

      </div>
    </section>
  );
};

export default SearchBar;