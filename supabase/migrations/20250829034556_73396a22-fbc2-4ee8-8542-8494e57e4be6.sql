-- Create treks table
CREATE TABLE public.treks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL, -- in days
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Moderate', 'Difficult', 'Extreme')),
  price DECIMAL(10,2) NOT NULL,
  max_participants INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  highlights TEXT[], -- array of highlights
  included TEXT[], -- what's included
  excluded TEXT[], -- what's not included
  itinerary JSONB, -- detailed itinerary
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trek_id UUID REFERENCES public.treks(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  participants_count INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  special_requests TEXT,
  booking_status TEXT DEFAULT 'pending' CHECK (booking_status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_treks_is_active ON public.treks(is_active);
CREATE INDEX idx_treks_start_date ON public.treks(start_date);
CREATE INDEX idx_bookings_trek_id ON public.bookings(trek_id);
CREATE INDEX idx_bookings_status ON public.bookings(booking_status);

-- Enable Row Level Security
ALTER TABLE public.treks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to treks
CREATE POLICY "Everyone can view active treks" ON public.treks
  FOR SELECT USING (is_active = true);

-- Create policies for inserting bookings
CREATE POLICY "Anyone can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (true);

-- Create policies for reading bookings (for admin purposes)
CREATE POLICY "Anyone can read bookings" ON public.bookings
  FOR SELECT USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_treks_updated_at
  BEFORE UPDATE ON public.treks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample treks data
INSERT INTO public.treks (title, description, duration, difficulty, price, max_participants, start_date, end_date, location, image_url, highlights, included, excluded, itinerary) VALUES
(
  'Everest Base Camp Trek',
  'Experience the ultimate adventure with our Everest Base Camp trek. This iconic journey takes you through the heart of the Himalayas, offering breathtaking views of the world''s highest peaks.',
  14,
  'Difficult',
  2499.00,
  12,
  '2024-03-15',
  '2024-03-28',
  'Nepal, Himalayas',
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
  ARRAY['Views of Mount Everest', 'Sherpa culture experience', 'Sagarmatha National Park', 'Tengboche Monastery'],
  ARRAY['Professional guide', 'Accommodation', 'Meals during trek', 'Permits', 'Airport transfers'],
  ARRAY['International flights', 'Travel insurance', 'Personal equipment', 'Tips'],
  '{"day1": "Arrival in Kathmandu", "day2": "Fly to Lukla, trek to Phakding", "day3": "Trek to Namche Bazaar"}'
),
(
  'Annapurna Circuit Trek',
  'Discover the beauty of the Annapurna region with this classic circuit trek. Experience diverse landscapes, from subtropical forests to high alpine terrain.',
  12,
  'Moderate',
  1899.00,
  16,
  '2024-04-01',
  '2024-04-12',
  'Nepal, Annapurna Region',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  ARRAY['Thorong La Pass (5,416m)', 'Diverse landscapes', 'Local village culture', 'Mountain views'],
  ARRAY['Experienced guide', 'Tea house accommodation', 'All meals', 'Permits and fees'],
  ARRAY['International flights', 'Travel insurance', 'Sleeping bag', 'Personal expenses'],
  '{"day1": "Drive to Besisahar", "day2": "Trek to Chame", "day3": "Trek to Pisang"}'
),
(
  'Kilimanjaro Summit Trek',
  'Conquer Africa''s highest peak with our expertly guided Kilimanjaro trek. Choose from multiple routes to reach Uhuru Peak at 5,895 meters.',
  7,
  'Difficult',
  2199.00,
  8,
  '2024-05-10',
  '2024-05-16',
  'Tanzania, East Africa',
  'https://images.unsplash.com/photo-1589182373726-e4f658ab50f2?w=800',
  ARRAY['Uhuru Peak summit', 'Diverse climate zones', 'Wildlife viewing', 'Glaciers and crater'],
  ARRAY['Professional guides', 'Camping equipment', 'All meals', 'Park fees', 'Transfers'],
  ARRAY['Flights to Tanzania', 'Visa fees', 'Travel insurance', 'Personal gear', 'Tips'],
  '{"day1": "Machame Gate to Machame Camp", "day2": "Machame Camp to Shira Camp", "day3": "Shira Camp to Barranco Camp"}'
);