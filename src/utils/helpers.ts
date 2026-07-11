export const formatINR = (value: number | string) =>
  Number(value).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export const nightsBetween = (checkIn: string, checkOut: string): number => {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.floor(diff / 86_400_000));
};

export const shortDate = (date: Date = new Date()) =>
  date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
