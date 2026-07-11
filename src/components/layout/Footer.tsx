const Footer = () => (
  <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-700 dark:bg-slate-950">
    <div className="mx-auto max-w-7xl px-6 flex flex-col items-center justify-between gap-4 md:flex-row">
      <p className="text-xl font-black text-slate-900 dark:text-white">Find My Hotel</p>
      <p className="text-sm text-slate-400 dark:text-slate-500">© {new Date().getFullYear()} Find My Hotel. All rights reserved.</p>
      <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
        <a href="#hotels" className="hover:text-amber-600 transition">Properties</a>
        <a href="#offerings" className="hover:text-amber-600 transition">Services</a>
        <a href="#story" className="hover:text-amber-600 transition">About</a>
      </div>
    </div>
  </footer>
);

export default Footer;
