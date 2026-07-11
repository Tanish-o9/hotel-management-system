const offerings = [
  { title: "Our Properties", sub: "Discover Your Ideal Room", desc: "Immerse yourself in our themed rooms, each offering a unique experience tailored to your preferences. Whether it's a cozy nest, a family suite, or a playful hideaway, we'll ensure a delightful stay for you." },
  { title: "Explore", sub: "Enhance Your Stay", desc: "Elevate your experience with our range of amenities and services. Let us take care of the details to ensure you make the most of your time with us, creating unforgettable memories effortlessly." },
  { title: "Gather", sub: "Host Your Event", desc: "Planning a special event? Our vibrant spaces are perfect for hosting gatherings, from family reunions to group getaways. Let us help you create lasting moments in a lively and colorful setting." },
  { title: "Indulge", sub: "Treat Yourself", desc: "Unwind and pamper yourself with our array of offerings, from nostalgic snacks to outdoor games. Let us bring joy and color to your stay, creating a whimsical and carefree atmosphere." },
];

const Offerings = () => (
  <section id="offerings" className="bg-slate-50 py-16 dark:bg-slate-900">
    <div className="mx-auto max-w-7xl px-6">
      <h2 className="mb-8 text-3xl font-black text-slate-900 dark:text-white">Our Properties</h2>
      <div className="divide-y divide-slate-200 border-t border-slate-200 dark:divide-slate-700 dark:border-slate-700">
        {offerings.map((o) => (
          <div key={o.title} className="grid grid-cols-12 items-start gap-4 py-8">
            <div className="col-span-3">
              <p className="text-base font-bold text-slate-900 dark:text-white">{o.title}</p>
            </div>
            <div className="col-span-3">
              <p className="text-sm font-semibold text-amber-600">{o.sub}</p>
            </div>
            <div className="col-span-6">
              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{o.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <a href="#hotels" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500">
          Book Now
        </a>
      </div>
    </div>
  </section>
);

export default Offerings;
