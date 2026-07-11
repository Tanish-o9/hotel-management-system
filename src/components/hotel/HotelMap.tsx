const locationCoords: Record<string, { lat: number; lon: number }> = {
  Mumbai: { lat: 19.076, lon: 72.8777 },
  Delhi: { lat: 28.6139, lon: 77.209 },
  Bengaluru: { lat: 12.9716, lon: 77.5946 },
  Chennai: { lat: 13.0827, lon: 80.2707 },
  Hyderabad: { lat: 17.385, lon: 78.4867 },
  Kolkata: { lat: 22.5726, lon: 88.3639 },
  Jaipur: { lat: 26.9124, lon: 75.7873 },
  Goa: { lat: 15.2993, lon: 74.124 },
  Pune: { lat: 18.5204, lon: 73.8567 },
  Ahmedabad: { lat: 23.0225, lon: 72.5714 },
  Gurgaon: { lat: 28.4595, lon: 77.0266 },
  Noida: { lat: 28.5355, lon: 77.391 },
};

const HotelMap = ({ location }: { location: string }) => {
  const coords = locationCoords[location] ?? { lat: 20.5937, lon: 78.9629 };
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - 0.05},${coords.lat - 0.05},${coords.lon + 0.05},${coords.lat + 0.05}&layer=mapnik&marker=${coords.lat},${coords.lon}`;

  return (
    <div className="mt-16">
      <h2 className="mb-4 text-2xl font-black text-slate-900 dark:text-white">Location & Map</h2>
      <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700">
        <iframe
          src={src}
          width="100%"
          height="380"
          loading="lazy"
          title={`Map of ${location}`}
          className="w-full"
        />
      </div>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">📍 {location}, India</p>
    </div>
  );
};

export default HotelMap;
