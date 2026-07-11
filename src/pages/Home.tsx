import Layout from "../components/layout/Layout";
import Hero from "../components/hero/Hero";
import HotelGrid from "../components/hotel/HotelGrid";
import Pagination from "../components/hotel/Pagination";
import Recommendations from "../components/hotel/Recommendations";
import KeyHighlights from "../components/KeyHighlights";
import GuestStories from "../components/GuestStories";
import OurStory from "../components/OurStory";
import ConnectWithUs from "../components/ConnectWithUs";
import { useHotels } from "../hooks/useHotels";

const Home = () => {
  const { currentPage, totalPages, goNext, goPrev } = useHotels();

  return (
    <Layout>
      <Hero />
      <Recommendations />
      <HotelGrid />
      <Pagination page={currentPage} totalPages={totalPages} onPrevious={goPrev} onNext={goNext} />
      <KeyHighlights />
      <GuestStories />
      <OurStory />
      <ConnectWithUs />
    </Layout>
  );
};

export default Home;
