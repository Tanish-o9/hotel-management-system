import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNotification } from "../../features/notifications/notificationsSlice";
import { openAuth } from "../../features/auth/authSlice";
import { shortDate } from "../../utils/helpers";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const seed: Review[] = [
  { name: "Priya S.", rating: 5, comment: "Absolutely stunning hotel! The service was impeccable and the room was spotless.", date: "Dec 2024" },
  { name: "Rahul M.", rating: 4, comment: "Great location and beautiful interiors. Would definitely visit again.", date: "Jan 2025" },
];

const ReviewSection = ({ hotelId }: { hotelId: number }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const key = `reviews_${hotelId}`;
  const [reviews, setReviews] = useState<Review[]>(() => {
    const stored = localStorage.getItem(key);
    return stored ? [...seed, ...JSON.parse(stored)] : seed;
  });
  const [form, setForm] = useState({ rating: 0, comment: "" });
  const [hover, setHover] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { dispatch(openAuth("login")); return; }
    if (!form.rating) return;
    const newReview: Review = { name: user.name, rating: form.rating, comment: form.comment, date: shortDate() };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    const stored = JSON.parse(localStorage.getItem(key) ?? "[]");
    localStorage.setItem(key, JSON.stringify([newReview, ...stored]));
    dispatch(addNotification({ message: "Review submitted! Thank you 🌟", type: "success" }));
    setForm({ rating: 0, comment: "" });
  };

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0";

  return (
    <div className="mt-16">
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Reviews & Ratings</h2>
        <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 dark:bg-slate-800">
          <FaStar className="text-amber-400 text-sm" />
          <span className="font-bold text-slate-800 dark:text-white">{avg}</span>
          <span className="text-xs text-slate-500">({reviews.length})</span>
        </div>
      </div>

      {/* Write Review */}
      <form onSubmit={handleSubmit} className="mb-10 rounded-2xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
        <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Write a Review</p>
        <div className="mb-3 flex gap-1">
          {[1,2,3,4,5].map((s) => (
            <button key={s} type="button" onClick={() => setForm({ ...form, rating: s })} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}>
              <FaStar className={`text-xl transition ${s <= (hover || form.rating) ? "text-amber-400" : "text-slate-300"}`} />
            </button>
          ))}
        </div>
        <textarea
          rows={3}
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          placeholder={user ? "Share your experience..." : "Sign in to write a review"}
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
        />
        <button type="submit" className="mt-3 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600 dark:bg-amber-600">
          {user ? "Submit Review" : "Sign in to Review"}
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div key={i} className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{r.name}</p>
                <p className="text-xs text-slate-400">{r.date}</p>
              </div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => <FaStar key={s} className={`text-sm ${s <= r.rating ? "text-amber-400" : "text-slate-200"}`} />)}
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
