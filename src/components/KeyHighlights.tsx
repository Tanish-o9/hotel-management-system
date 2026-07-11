const highlights = [
  { label: "Vibrant Themes" },
  { label: "Playful Decor" },
  { label: "Colorful Amenities" },
  { label: "Lively Atmosphere" },
  { label: "Outdoor Entertainment" },
  { label: "Nostalgic Delights" },
];

const KeyHighlights = () => (
  <section id="highlights" className="bg-slate-50 py-20 dark:bg-slate-900">
    <div className="mx-auto max-w-7xl px-6">
      <h2 className="mb-16 text-center text-3xl font-black text-slate-900 dark:text-white">Key Highlights</h2>
      <div className="grid grid-cols-3 gap-y-12 border-t border-slate-300 pt-12 dark:border-slate-700">
        {highlights.slice(0, 3).map((h) => (
          <div key={h.label} className="text-center">
            <p className="text-sm font-semibold text-amber-600">{h.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid grid-cols-3 gap-y-12 border-t border-slate-300 pt-12 dark:border-slate-700">
        {highlights.slice(3).map((h) => (
          <div key={h.label} className="text-center">
            <p className="text-sm font-semibold text-amber-600">{h.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default KeyHighlights;
