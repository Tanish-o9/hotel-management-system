import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrevious(): void;
  onNext(): void;
}

const Pagination = ({ page, totalPages, onPrevious, onNext }: PaginationProps) => (
  <section className="bg-white py-10">
    <div className="flex items-center justify-center gap-4">
      <button
        disabled={page === 1}
        onClick={onPrevious}
        className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-40"
      >
        <FaChevronLeft />
      </button>
      <span className="text-sm font-semibold text-slate-700">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={onNext}
        className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-40"
      >
        <FaChevronRight />
      </button>
    </div>
  </section>
);

export default Pagination;
