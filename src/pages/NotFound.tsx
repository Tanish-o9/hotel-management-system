import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

const NotFound = () => (
  <Layout>
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-8xl font-black text-slate-200 dark:text-slate-700">404</p>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Page Not Found</h1>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500"
      >
        Back to Home
      </Link>
    </section>
  </Layout>
);

export default NotFound;
