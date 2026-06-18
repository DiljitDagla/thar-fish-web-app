import {
  Customer,
  ConsultancyService,
  Enquiry,
  FishProduct,
  HatcheryBatch,
  Order,
  Pond,
  ResortBooking,
  ResortPackage,
} from "./types";
import { FISH_IMAGES, IMAGES } from "./images";

export { IMAGES, FISH_IMAGES, GALLERY } from "./images";

// ---------- Seeded deterministic RNG (mulberry32) ----------
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260606);
const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const between = (min: number, max: number): number =>
  Math.floor(rand() * (max - min + 1)) + min;

// Fixed reference "today" so SSR/CSR match (matches demo date).
const TODAY = new Date("2026-06-06T00:00:00Z").getTime();
const DAY = 86400000;
const dateAgo = (days: number) =>
  new Date(TODAY - days * DAY).toISOString().slice(0, 10);
const dateAhead = (days: number) =>
  new Date(TODAY + days * DAY).toISOString().slice(0, 10);

// ---------- Static reference data ----------
export const COMPANY = {
  name: "Thar Fish Hatchery Rathore Farm",
  short: "Thar Fish",
  location: "Raner, Bikaner, Rajasthan",
  email: "info@tharfish.com",
  phone: "+91 9876543210",
  tagline: "Premium Aquaculture from the Heart of the Thar Desert",
};

// ---------- Fish Marketplace ----------
const FISH_DEFS: Omit<FishProduct, "id" | "image" | "rating">[] = [
  {
    name: "Rohu",
    category: "Indian Major Carp",
    description:
      "Prized freshwater carp with tender white flesh. Farm-raised in oxygen-rich ponds for premium table quality.",
    weight: "1.2 - 2.5 kg",
    price: 220,
    availability: "In Stock",
    quantity: 8400,
    avgWeight: 1.8,
  },
  {
    name: "Katla",
    category: "Indian Major Carp",
    description:
      "Fast-growing surface feeder known for its rich flavour. A staple of Rajasthan's freshwater cuisine.",
    weight: "1.5 - 3.0 kg",
    price: 240,
    availability: "In Stock",
    quantity: 6200,
    avgWeight: 2.2,
  },
  {
    name: "Tilapia",
    category: "Cichlid",
    description:
      "Mild, versatile and protein-rich. Sustainably grown with low feed conversion for everyday value.",
    weight: "0.5 - 1.0 kg",
    price: 180,
    availability: "In Stock",
    quantity: 11500,
    avgWeight: 0.7,
  },
  {
    name: "Pangasius",
    category: "Catfish",
    description:
      "Boneless fillets with a clean taste. Hardy species cultured in controlled biofloc systems.",
    weight: "0.8 - 1.5 kg",
    price: 160,
    availability: "Low Stock",
    quantity: 1850,
    avgWeight: 1.1,
  },
  {
    name: "Grass Carp",
    category: "Herbivorous Carp",
    description:
      "Eco-friendly herbivore that thrives on aquatic vegetation. Lean meat ideal for grilling.",
    weight: "2.0 - 4.0 kg",
    price: 200,
    availability: "In Stock",
    quantity: 4300,
    avgWeight: 2.9,
  },
  {
    name: "Common Carp",
    category: "Carp",
    description:
      "Robust and flavourful bottom feeder. Resilient across seasons and a favourite for community ponds.",
    weight: "1.0 - 2.5 kg",
    price: 190,
    availability: "In Stock",
    quantity: 5600,
    avgWeight: 1.6,
  },
];

export const FISH_PRODUCTS: FishProduct[] = FISH_DEFS.map((f, i) => ({
  ...f,
  id: `FISH-${String(i + 1).padStart(3, "0")}`,
  image: FISH_IMAGES[f.name],
  rating: 4 + Math.round(rand() * 10) / 10,
}));

// ---------- Customers (500+) ----------
const FIRST = [
  "Vikram", "Priya", "Arjun", "Meena", "Rajveer", "Anjali", "Karan", "Pooja",
  "Devendra", "Sunita", "Mahesh", "Kavita", "Rohit", "Neha", "Suresh", "Geeta",
  "Yashwant", "Lakshmi", "Bhanu", "Sangeeta", "Naresh", "Ritu", "Gopal", "Asha",
  "Hemant", "Divya", "Mukesh", "Komal", "Ranjit", "Shreya", "Ajay", "Nisha",
];
const LAST = [
  "Rathore", "Singh", "Sharma", "Choudhary", "Mehta", "Bishnoi", "Rajput",
  "Soni", "Jangid", "Suthar", "Vyas", "Purohit", "Beniwal", "Saini", "Meghwal",
  "Gehlot", "Tak", "Chauhan", "Parihar", "Pareek",
];
const CITIES = [
  "Bikaner", "Jodhpur", "Jaipur", "Nagaur", "Sri Ganganagar", "Churu",
  "Hanumangarh", "Jaisalmer", "Barmer", "Pali", "Ajmer", "Udaipur",
];

export const CUSTOMERS: Customer[] = Array.from({ length: 524 }, (_, i) => {
  const first = pick(FIRST);
  const last = pick(LAST);
  const name = `${first} ${last}`;
  const orders = between(0, 24);
  return {
    id: `CUST-${String(i + 1).padStart(4, "0")}`,
    name,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${between(1, 99)}@gmail.com`,
    phone: `+91 ${between(70, 99)}${between(10000000, 99999999)}`,
    status: rand() > 0.85 ? "VIP" : rand() > 0.2 ? "Active" : "Inactive",
    registrationDate: dateAgo(between(1, 1000)),
    city: pick(CITIES),
    totalOrders: orders,
    totalSpent: orders * between(800, 6000),
  };
});

// ---------- Orders (1000+) ----------
export const ORDERS: Order[] = Array.from({ length: 1080 }, (_, i) => {
  const fish = pick(FISH_PRODUCTS);
  const qty = between(10, 500);
  const customer = pick(CUSTOMERS);
  return {
    id: `ORD-${String(i + 1).padStart(5, "0")}`,
    orderNumber: `TF${between(100000, 999999)}`,
    customer: customer.name,
    fishType: fish.name,
    quantity: qty,
    amount: qty * fish.price,
    paymentStatus: rand() > 0.78 ? "Pending" : rand() > 0.04 ? "Paid" : "Refunded",
    deliveryStatus: pick([
      "Delivered", "Delivered", "Delivered", "Processing", "Shipped", "Cancelled",
    ]),
    date: dateAgo(between(0, 365)),
  };
});

// ---------- Ponds (15) ----------
export const PONDS: Pond[] = Array.from({ length: 15 }, (_, i) => {
  const health = pick<Pond["healthStatus"]>([
    "Excellent", "Excellent", "Good", "Good", "Good", "Monitor", "Critical",
  ]);
  return {
    id: `POND-${String(i + 1).padStart(2, "0")}`,
    name: `Pond ${String.fromCharCode(65 + (i % 26))}${i >= 26 ? Math.floor(i / 26) : ""}`,
    area: `${(between(8, 40) / 10).toFixed(1)} acres`,
    waterLevel: between(55, 98),
    fishCount: between(2000, 12000),
    species: pick(FISH_PRODUCTS).name,
    healthStatus: health,
    temperature: between(22, 31),
    ph: Number((6.8 + rand() * 1.6).toFixed(1)),
  };
});

// ---------- Hatchery Batches ----------
export const HATCHERY: HatcheryBatch[] = Array.from({ length: 12 }, (_, i) => {
  const start = between(5, 120);
  return {
    id: `HB-${String(i + 1).padStart(3, "0")}`,
    batchId: `BATCH-2026-${String(i + 1).padStart(3, "0")}`,
    fishType: pick(FISH_PRODUCTS).name,
    seedQuantity: between(20000, 150000),
    growthStage: pick<HatcheryBatch["growthStage"]>([
      "Egg", "Larvae", "Fry", "Fingerling", "Juvenile",
    ]),
    mortalityRate: Number((rand() * 14 + 2).toFixed(1)),
    startDate: dateAgo(start),
    expectedHarvest: dateAhead(between(20, 90)),
  };
});

// ---------- Resort Packages ----------
export const RESORT_PACKAGES: ResortPackage[] = [
  {
    id: "PKG-01",
    name: "Family Package",
    duration: "2 Days / 1 Night",
    price: 8999,
    image: IMAGES.family,
    description:
      "A relaxed lakeside getaway for the whole family with pond-side dining and fishing.",
    facilities: ["Lakeside Cottage", "All Meals", "Fishing Experience", "Bonfire Evening", "Kids' Activities"],
  },
  {
    id: "PKG-02",
    name: "Weekend Escape",
    duration: "3 Days / 2 Nights",
    price: 14999,
    image: IMAGES.resort,
    popular: true,
    description:
      "Unwind over a long weekend with guided farm walks, spa, and desert sunsets.",
    facilities: ["Premium Suite", "All Meals", "Spa Session", "Desert Safari", "Guided Farm Tour"],
  },
  {
    id: "PKG-03",
    name: "School Tour",
    duration: "1 Day",
    price: 599,
    image: IMAGES.schoolTour,
    description:
      "Hands-on aquaculture learning for students with live hatchery demonstrations.",
    facilities: ["Guided Hatchery Visit", "Lunch", "Learning Kit", "Certificate", "Group Discounts"],
  },
  {
    id: "PKG-04",
    name: "Educational Aquaculture Tour",
    duration: "2 Days / 1 Night",
    price: 4999,
    image: IMAGES.consultancy,
    description:
      "An immersive program for agriculture students and aspiring fish farmers.",
    facilities: ["Expert Sessions", "Pond Workshops", "Accommodation", "Meals", "Course Material"],
  },
  {
    id: "PKG-05",
    name: "Corporate Retreat",
    duration: "3 Days / 2 Nights",
    price: 24999,
    image: IMAGES.corporate,
    description:
      "Team-building amid the Thar with conference facilities and curated experiences.",
    facilities: ["Conference Hall", "Luxury Tents", "Team Activities", "All Meals", "Cultural Night"],
  },
];

// ---------- Resort Bookings (50+) ----------
export const RESORT_BOOKINGS: ResortBooking[] = Array.from(
  { length: 56 },
  (_, i) => {
    const pkg = pick(RESORT_PACKAGES);
    const inDays = between(-40, 60);
    const nights = between(1, 3);
    const guests = between(1, 12);
    return {
      id: `BK-${String(i + 1).padStart(4, "0")}`,
      customer: pick(CUSTOMERS).name,
      package: pkg.name,
      checkIn: inDays >= 0 ? dateAhead(inDays) : dateAgo(-inDays),
      checkOut:
        inDays >= 0 ? dateAhead(inDays + nights) : dateAgo(-inDays - nights),
      guests,
      status: pick<ResortBooking["status"]>([
        "Confirmed", "Confirmed", "Pending", "Checked-In", "Completed", "Cancelled",
      ]),
      amount: pkg.price * Math.max(1, Math.ceil(guests / 4)),
    };
  }
);

// ---------- Consultancy Services ----------
export const CONSULTANCY_SERVICES: ConsultancyService[] = [
  { id: "CS-1", name: "Hatchery Setup", icon: "Egg", price: "From ₹2,50,000", description: "End-to-end design and commissioning of modern fish hatcheries with breeding units." },
  { id: "CS-2", name: "Pond Design", icon: "Waves", price: "From ₹80,000", description: "Scientific pond layout, lining, aeration and inlet/outlet engineering for max yield." },
  { id: "CS-3", name: "Fisheries Consulting", icon: "Fish", price: "From ₹25,000", description: "Species selection, stocking density and feed planning tailored to your water." },
  { id: "CS-4", name: "Water Quality Analysis", icon: "FlaskConical", price: "From ₹5,000", description: "Lab-grade testing of pH, DO, ammonia and hardness with corrective action plans." },
  { id: "CS-5", name: "Aquaculture Advisory", icon: "Lightbulb", price: "From ₹15,000", description: "Ongoing advisory retainer covering biosecurity, growth tracking and economics." },
  { id: "CS-6", name: "Fish Disease Management", icon: "ShieldPlus", price: "From ₹12,000", description: "Diagnosis and treatment protocols for parasitic, bacterial and fungal outbreaks." },
];

// ---------- Enquiries (200+) ----------
const MESSAGES = [
  "We are planning a 5-acre pond near Nagaur and need a complete setup consultation.",
  "Looking for guidance on Rohu and Katla polyculture stocking ratios.",
  "Our fish are showing signs of disease, need urgent water and health analysis.",
  "Interested in setting up a small hatchery for fish seed production.",
  "Need a water quality audit before the next stocking cycle.",
  "Want advisory support for converting an existing farm pond to aquaculture.",
  "Requesting a quote for biofloc system design for Tilapia.",
  "Please advise on feed schedule and aeration for grow-out ponds.",
];
export const ENQUIRIES: Enquiry[] = Array.from({ length: 214 }, (_, i) => {
  const c = pick(CUSTOMERS);
  return {
    id: `ENQ-${String(i + 1).padStart(4, "0")}`,
    name: c.name,
    phone: c.phone,
    email: c.email,
    service: pick(CONSULTANCY_SERVICES).name,
    message: pick(MESSAGES),
    date: dateAgo(between(0, 180)),
    status: pick<Enquiry["status"]>(["New", "New", "In Progress", "Completed", "Completed"]),
  };
});

// ---------- Analytics / chart data ----------
const MONTHS = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export const MONTHLY_REVENUE = MONTHS.map((m, i) => ({
  month: m,
  revenue: between(900000, 2400000) + i * 60000,
  expenses: between(400000, 900000),
}));

export const FISH_SALES_TREND = MONTHS.map((m) => ({
  month: m,
  Rohu: between(400, 1200),
  Katla: between(300, 1000),
  Tilapia: between(500, 1500),
}));

export const CUSTOMER_GROWTH = MONTHS.map((m, i) => ({
  month: m,
  customers: 180 + i * between(20, 45),
}));

export const RESORT_BOOKING_TREND = MONTHS.map((m) => ({
  month: m,
  bookings: between(8, 42),
}));

export const POPULAR_SPECIES = FISH_PRODUCTS.map((f) => ({
  name: f.name,
  value: between(8, 30),
}));

export const SERVICE_ENQUIRIES = CONSULTANCY_SERVICES.map((s) => ({
  name: s.name.replace(" Management", "").replace(" Analysis", ""),
  enquiries: between(15, 60),
}));

// ---------- Derived KPIs ----------
export const KPIS = {
  totalCustomers: CUSTOMERS.length,
  totalOrders: ORDERS.length,
  totalRevenue: ORDERS.filter((o) => o.paymentStatus === "Paid").reduce((s, o) => s + o.amount, 0),
  totalFishStock: FISH_PRODUCTS.reduce((s, f) => s + f.quantity, 0),
  totalResortBookings: RESORT_BOOKINGS.length,
  totalEnquiries: ENQUIRIES.length,
};

export const STATS = {
  activePonds: PONDS.length,
  fishSpecies: FISH_PRODUCTS.length,
  annualProduction: "1,240 T",
  touristVisits: "18.6K",
};

export const TESTIMONIALS = [
  { name: "Devendra Rathore", role: "Fish Farmer, Nagaur", text: "Thar Fish helped me design my first 3-acre pond. My yield doubled within a year. Their advisory team is exceptional.", avatar: "DR" },
  { name: "Priya Sharma", role: "Resort Guest, Jaipur", text: "The Weekend Escape was magical — desert sunsets, fresh fish thalis and the calmest lakeside cottages. Highly recommended!", avatar: "PS" },
  { name: "Karan Bishnoi", role: "Aquaculture Entrepreneur", text: "From hatchery setup to disease management, they have been our partners at every step. Truly professional.", avatar: "KB" },
];

export const NEWS = [
  { title: "Thar Fish crosses 1,200 tonnes annual production", date: dateAgo(8), excerpt: "A record harvest season powered by solar aeration and biofloc technology across 15 ponds.", image: IMAGES.pondAerial },
  { title: "New educational aquaculture program for students", date: dateAgo(21), excerpt: "Partnering with agricultural universities to train the next generation of fish farmers.", image: IMAGES.schoolTour },
  { title: "Eco-resort wins Rajasthan sustainable tourism award", date: dateAgo(40), excerpt: "Recognised for water-positive operations and community-led desert tourism.", image: IMAGES.resort },
];

export const TIMELINE = [
  { year: "2009", title: "Humble Beginnings", text: "Started with a single 1-acre pond in Raner, Bikaner with native carp species." },
  { year: "2013", title: "First Hatchery", text: "Commissioned our first fish seed hatchery, achieving self-reliance in quality seed." },
  { year: "2017", title: "Consultancy Wing", text: "Launched fisheries consultancy, advising 200+ farms across western Rajasthan." },
  { year: "2021", title: "Eco-Resort Opens", text: "Opened the lakeside eco-resort, blending aquaculture with desert tourism." },
  { year: "2026", title: "Smart Aquaculture", text: "Solar-powered, sensor-driven operations producing 1,200+ tonnes annually." },
];
