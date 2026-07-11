const stories = [
  { quote: "Staying here was a blast! The themed room added so much fun to our getaway, and the amenities were fantastic.", name: "Lily W." },
  { quote: "Exceeded our expectations. The vibrant atmosphere and playful decor made our stay truly memorable.", name: "Tom H." },
  { quote: "I highly recommend this to anyone looking for a colorful and joyful escape. The experience was truly delightful.", name: "Sophia K." },
];

const GuestStories = () => (
  <section className="bg-slate-800 py-20">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black text-white">Guest Stories</h2>
        </div>
        <div className="space-y-8 divide-y divide-slate-600">
          {stories.map((s) => (
            <div key={s.name} className="pt-8 first:pt-0">
              <p className="text-sm leading-7 text-slate-300">"{s.quote}"</p>
              <p className="mt-3 text-right text-sm font-semibold text-white">{s.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default GuestStories;
