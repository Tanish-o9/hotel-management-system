const OurStory = () => (
  <section id="story" className="bg-white py-20 dark:bg-slate-950">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Our Story</h2>
          <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
            Find My Hotel is a vibrant and modern hotel discovery platform offering uniquely curated stays with playful decor and colorful amenities. We take pride in creating an inviting atmosphere filled with bright ideas and cheerful experiences, providing an ideal setting for families, friends, and groups seeking a fun getaway.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
            alt="Our Story"
            className="h-72 w-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
);

export default OurStory;
