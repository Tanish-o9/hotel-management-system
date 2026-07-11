export const LOCATIONS = [
  "Ahmedabad", "Bengaluru", "Chennai", "Delhi",
  "Goa", "Gurgaon", "Hyderabad", "Jaipur",
  "Kolkata", "Mumbai", "Noida", "Pune",
] as const;

export const PAGE_SIZE = 12;

export const SORT_OPTIONS = [
  { value: "", label: "Sort By" },
  { value: "price", label: "Price ↑" },
  { value: "-price", label: "Price ↓" },
  { value: "rating", label: "Rating ↑" },
  { value: "-rating", label: "Rating ↓" },
] as const;

export const RATING_OPTIONS = [
  { value: "", label: "Any Rating" },
  { value: "5", label: "5 ⭐" },
  { value: "4", label: "4+ ⭐" },
  { value: "3", label: "3+ ⭐" },
] as const;
