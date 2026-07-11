import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaLocationDot, FaStar, FaHeart, FaCalendar } from "react-icons/fa6";
import Layout from "../components/layout/Layout";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchHotelById } from "../features/hotels/hotelSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { openAuth } from "../features/auth/authSlice";
import { addNotification } from "../features/notifications/notificationsSlice";
import BookingModal from "../components/booking/BookingModal";
import HotelMap from "../components/hotel/HotelMap";
import ReviewSection from "../components/reviews/ReviewSection";

const HotelDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedHotel, loading, error } = useAppSelector((s) => s.hotels);
  const user = useAppSelector((s) => s.auth.user);
  const isFav = useAppSelector((s) => selectedHotel ? s.wishlist.ids.includes(selectedHotel.id) : false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchHotelById(Number(id)));
  }, [dispatch, id]);

  const handleWishlist = () => {
    if (!selectedHotel) return;
    if (!user) { dispatch(openAuth("login")); return; }
    dispatch(toggleWishlist(selectedHotel.id));
    dispatch(addNotification({
      message: isFav ? `Removed from wishlist` : `Added ${selectedHotel.name} to wishlist ❤️`,
      type: isFav ? "info" : "success",
    }));
  };

  if (loading) return <Layout><div className="flex min-h-[70vh] items-center justify-center"><p className="text-slate-500">Loading hotel...</p></div></Layout>;
  if (error) return <Layout><div className="flex min-h-[70vh] items-center justify-center"><p className="text-red-500">{error}</p></div></Layout>;
  if (!selectedHotel) return <Layout><div className="flex min-h-[70vh] items-center justify-center"><p className="text-slate-500">Hotel not found.</p></div></Layout>;

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <Link to="/" className="mb-10 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800">
          <FaArrowLeft /> Back to Hotels
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <img src={selectedHotel.thumbnail} alt={selectedHotel.name}
              className="h-[480px] w-full rounded-2xl object-cover shadow-lg" />
            <button onClick={handleWishlist}
              className={`absolute right-4 top-4 rounded-full p-3 shadow-lg transition ${isFav ? "bg-red-500 text-white" : "bg-white text-slate-400 hover:text-red-500"}`}>
              <FaHeart size={18} />
            </button>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">{selectedHotel.name}</h1>
              <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 dark:bg-slate-800">
                <FaStar className="text-amber-400" />
                <span className="font-bold text-slate-800 dark:text-white">{selectedHotel.rating}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <FaLocationDot className="text-amber-500" />
              <span>{selectedHotel.location}, India</span>
            </div>

            <div className="mt-8">
              <p className="text-4xl font-black text-amber-600">₹{Number(selectedHotel.price).toLocaleString("en-IN")}</p>
              <p className="mt-1 text-sm text-slate-500">per night</p>
            </div>

            <div className="mt-8">
              <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">About this hotel</h3>
              <p className="leading-7 text-slate-600 dark:text-slate-300">{selectedHotel.description}</p>
            </div>

            <div className="mt-8 flex gap-3">
              <button onClick={() => setShowBooking(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500">
                <FaCalendar /> Book Now
              </button>
              <button onClick={handleWishlist}
                className={`rounded-xl border px-4 py-3 transition ${isFav ? "border-red-200 bg-red-50 text-red-500" : "border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-500 dark:border-slate-700 dark:text-slate-400"}`}>
                <FaHeart />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {selectedHotel.photos?.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-black text-slate-900 dark:text-white">Photo Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {selectedHotel.photos.map((photo, i) => (
                <img key={i} src={photo} alt={`Photo ${i + 1}`} loading="lazy"
                  className="h-56 w-full rounded-2xl object-cover transition duration-300 hover:scale-105 hover:shadow-xl" />
              ))}
            </div>
          </div>
        )}

        {/* Map */}
        <HotelMap location={selectedHotel.location} />

        {/* Reviews */}
        <ReviewSection hotelId={selectedHotel.id} />
      </section>

      {showBooking && (
        <BookingModal
          hotelId={selectedHotel.id}
          hotelName={selectedHotel.name}
          hotelImage={selectedHotel.thumbnail}
          location={selectedHotel.location}
          price={Number(selectedHotel.price)}
          onClose={() => setShowBooking(false)}
        />
      )}
    </Layout>
  );
};

export default HotelDetails;
