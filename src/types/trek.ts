export interface Trek {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Extreme';
  price: number;
  max_participants: number;
  start_date: string;
  end_date: string;
  location: string;
  image_url?: string;
  gallery_images: string[];
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: Record<string, string>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  trek_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  participants_count: number;
  total_amount: number;
  special_requests?: string;
  booking_status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface BookingFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  participants_count: number;
  special_requests?: string;
}