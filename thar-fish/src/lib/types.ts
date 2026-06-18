export type Role = "admin" | "user";

export interface AuthUser {
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface FishProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  weight: string;
  price: number;
  availability: "In Stock" | "Low Stock" | "Out of Stock";
  quantity: number;
  avgWeight: number;
  image: string;
  rating: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "VIP";
  registrationDate: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  fishType: string;
  quantity: number;
  amount: number;
  paymentStatus: "Paid" | "Pending" | "Refunded";
  deliveryStatus: "Delivered" | "Processing" | "Shipped" | "Cancelled";
  date: string;
}

export interface Pond {
  id: string;
  name: string;
  area: string;
  waterLevel: number;
  fishCount: number;
  species: string;
  healthStatus: "Excellent" | "Good" | "Monitor" | "Critical";
  temperature: number;
  ph: number;
}

export interface HatcheryBatch {
  id: string;
  batchId: string;
  fishType: string;
  seedQuantity: number;
  growthStage: "Egg" | "Larvae" | "Fry" | "Fingerling" | "Juvenile";
  mortalityRate: number;
  startDate: string;
  expectedHarvest: string;
}

export interface ResortPackage {
  id: string;
  name: string;
  duration: string;
  price: number;
  image: string;
  facilities: string[];
  description: string;
  popular?: boolean;
}

export interface ResortBooking {
  id: string;
  customer: string;
  package: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "Confirmed" | "Pending" | "Checked-In" | "Completed" | "Cancelled";
  amount: number;
}

export interface ConsultancyService {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  date: string;
  status: "New" | "In Progress" | "Completed";
}

export interface CartItem {
  product: FishProduct;
  qty: number;
}
