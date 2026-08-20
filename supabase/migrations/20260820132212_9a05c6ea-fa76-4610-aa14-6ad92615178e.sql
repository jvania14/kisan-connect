
-- PROFILES
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  phone text,
  email text,
  village text,
  district text,
  state text,
  latitude double precision,
  longitude double precision,
  preferred_language text NOT NULL DEFAULT 'hi',
  farmer_type text,
  profile_image text,
  is_verified boolean NOT NULL DEFAULT false,
  rating numeric(2,1) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_public_read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- MACHINERY
CREATE TABLE public.machinery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text NOT NULL,
  brand text,
  model text,
  description text,
  terms text,
  price_per_day numeric(10,2) NOT NULL CHECK (price_per_day >= 0),
  state text,
  district text,
  village text,
  latitude double precision,
  longitude double precision,
  image_url text,
  available_from date,
  available_until date,
  rating numeric(2,1) NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  is_verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.machinery TO authenticated;
GRANT SELECT ON public.machinery TO anon;
GRANT ALL ON public.machinery TO service_role;
ALTER TABLE public.machinery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "machinery_public_read" ON public.machinery FOR SELECT USING (true);
CREATE POLICY "machinery_insert_own" ON public.machinery FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "machinery_update_own" ON public.machinery FOR UPDATE TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "machinery_delete_own" ON public.machinery FOR DELETE TO authenticated USING (auth.uid() = owner_id);

-- BOOKINGS
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  machinery_id uuid NOT NULL REFERENCES public.machinery(id) ON DELETE CASCADE,
  renter_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  owner_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date NOT NULL,
  total_price numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (end_date >= start_date)
);
CREATE INDEX bookings_machinery_idx ON public.bookings(machinery_id, status);
GRANT SELECT, INSERT, UPDATE ON public.bookings TO authenticated;
GRANT SELECT ON public.bookings TO anon;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
-- Availability must be visible to everyone browsing the calendar
CREATE POLICY "bookings_public_read" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "bookings_insert_own" ON public.bookings FOR INSERT TO authenticated WITH CHECK (auth.uid() = renter_id);
CREATE POLICY "bookings_update_party" ON public.bookings FOR UPDATE TO authenticated USING (auth.uid() = renter_id OR auth.uid() = owner_id) WITH CHECK (auth.uid() = renter_id OR auth.uid() = owner_id);

-- prevent overlapping bookings at the database level
CREATE OR REPLACE FUNCTION public.prevent_booking_overlap()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status IN ('pending','confirmed') AND EXISTS (
    SELECT 1 FROM public.bookings b
    WHERE b.machinery_id = NEW.machinery_id
      AND b.id <> NEW.id
      AND b.status IN ('pending','confirmed')
      AND b.start_date <= NEW.end_date
      AND b.end_date >= NEW.start_date
  ) THEN
    RAISE EXCEPTION 'This machinery is already booked for the selected dates';
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER bookings_no_overlap BEFORE INSERT OR UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.prevent_booking_overlap();

-- REVIEWS
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES public.bookings(id) ON DELETE CASCADE,
  reviewer_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reviewed_user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  machinery_id uuid REFERENCES public.machinery(id) ON DELETE CASCADE,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.reviews TO authenticated;
GRANT SELECT ON public.reviews TO anon;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews_public_read" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert_own" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = reviewer_id);

-- CROP RESIDUES
CREATE TABLE public.crop_residues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  residue_type text NOT NULL,
  quantity numeric(10,2) NOT NULL,
  unit text NOT NULL DEFAULT 'kg',
  price numeric(10,2) NOT NULL DEFAULT 0,
  description text,
  state text,
  district text,
  village text,
  image_url text,
  available boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crop_residues TO authenticated;
GRANT SELECT ON public.crop_residues TO anon;
GRANT ALL ON public.crop_residues TO service_role;
ALTER TABLE public.crop_residues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "residues_public_read" ON public.crop_residues FOR SELECT USING (true);
CREATE POLICY "residues_insert_own" ON public.crop_residues FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "residues_update_own" ON public.crop_residues FOR UPDATE TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "residues_delete_own" ON public.crop_residues FOR DELETE TO authenticated USING (auth.uid() = owner_id);

-- RESIDUE REQUESTS
CREATE TABLE public.residue_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  residue_id uuid NOT NULL REFERENCES public.crop_residues(id) ON DELETE CASCADE,
  requester_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  owner_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  quantity numeric(10,2) NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','accepted','rejected','completed')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.residue_requests TO authenticated;
GRANT ALL ON public.residue_requests TO service_role;
ALTER TABLE public.residue_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "residue_requests_read_party" ON public.residue_requests FOR SELECT TO authenticated USING (auth.uid() = requester_id OR auth.uid() = owner_id);
CREATE POLICY "residue_requests_insert_own" ON public.residue_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "residue_requests_update_party" ON public.residue_requests FOR UPDATE TO authenticated USING (auth.uid() = requester_id OR auth.uid() = owner_id) WITH CHECK (auth.uid() = requester_id OR auth.uid() = owner_id);

-- COMMUNITY
CREATE TABLE public.community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'Farming Advice',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.community_posts TO authenticated;
GRANT SELECT ON public.community_posts TO anon;
GRANT ALL ON public.community_posts TO service_role;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "posts_public_read" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "posts_insert_own" ON public.community_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "posts_update_own" ON public.community_posts FOR UPDATE TO authenticated USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);
CREATE POLICY "posts_delete_own" ON public.community_posts FOR DELETE TO authenticated USING (auth.uid() = author_id);

CREATE TABLE public.community_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.community_comments TO authenticated;
GRANT SELECT ON public.community_comments TO anon;
GRANT ALL ON public.community_comments TO service_role;
ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "comments_public_read" ON public.community_comments FOR SELECT USING (true);
CREATE POLICY "comments_insert_own" ON public.community_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "comments_delete_own" ON public.community_comments FOR DELETE TO authenticated USING (auth.uid() = author_id);

CREATE TABLE public.post_likes (
  post_id uuid NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);
GRANT SELECT, INSERT, DELETE ON public.post_likes TO authenticated;
GRANT SELECT ON public.post_likes TO anon;
GRANT ALL ON public.post_likes TO service_role;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "likes_public_read" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "likes_insert_own" ON public.post_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "likes_delete_own" ON public.post_likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- NOTIFICATIONS
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifications_read_own" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "notifications_insert_any" ON public.notifications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "notifications_update_own" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- DEMO SEED DATA (demo farmer profiles are not linked to login accounts)
INSERT INTO public.profiles (id, name, phone, village, district, state, latitude, longitude, preferred_language, farmer_type, is_verified, rating) VALUES
 ('11111111-1111-4111-8111-111111111111','Ramesh Choudhary','+919812345601','Bagru','Jaipur','Rajasthan',26.8145,75.5620,'hi','Owner Farmer',true,4.8),
 ('22222222-2222-4222-8222-222222222222','Suresh Meena','+919812345602','Chomu','Jaipur','Rajasthan',27.1667,75.7167,'hi','Owner Farmer',true,4.5),
 ('33333333-3333-4333-8333-333333333333','Vikram Singh','+919812345603','Sanganer','Jaipur','Rajasthan',26.8180,75.7900,'hi','Custom Hiring Centre',true,4.9),
 ('44444444-4444-4444-8444-444444444444','Anita Devi','+919812345604','Pushkar','Ajmer','Rajasthan',26.4899,74.5511,'hi','Owner Farmer',false,4.2),
 ('55555555-5555-4555-8555-555555555555','Mohan Lal','+919812345605','Amer','Jaipur','Rajasthan',26.9855,75.8513,'hi','Owner Farmer',true,4.6);

INSERT INTO public.machinery (owner_id, name, category, brand, model, description, terms, price_per_day, state, district, village, latitude, longitude, image_url, available_from, available_until, rating, is_verified) VALUES
 ('11111111-1111-4111-8111-111111111111','Mahindra 575 DI Tractor','Tractor','Mahindra','575 DI','45 HP tractor in excellent condition, suitable for ploughing, hauling and rotavator work.','Diesel to be arranged by renter. Driver available at extra Rs.400/day.',800,'Rajasthan','Jaipur','Bagru',26.8145,75.5620,null,CURRENT_DATE - 5, CURRENT_DATE + 120,4.8,true),
 ('22222222-2222-4222-8222-222222222222','Swaraj 744 FE Tractor','Tractor','Swaraj','744 FE','50 HP well-maintained tractor, ideal for heavy field work and trolley pulling.','Renter responsible for fuel. Minimum 1 day booking.',950,'Rajasthan','Jaipur','Chomu',27.1667,75.7167,null,CURRENT_DATE, CURRENT_DATE + 90,4.5,true),
 ('33333333-3333-4333-8333-333333333333','John Deere 5310 Tractor','Tractor','John Deere','5310','55 HP powerful tractor with power steering. Serviced last month.','Security deposit Rs.2000, refundable.',1200,'Rajasthan','Jaipur','Sanganer',26.8180,75.7900,null,CURRENT_DATE, CURRENT_DATE + 60,4.9,true),
 ('44444444-4444-4444-8444-444444444444','Combine Harvester','Harvester','Preet','987','Self-propelled combine harvester for wheat and mustard harvesting.','Operator included in price. Fuel extra.',4500,'Rajasthan','Ajmer','Pushkar',26.4899,74.5511,null,CURRENT_DATE + 3, CURRENT_DATE + 70,4.2,false),
 ('55555555-5555-4555-8555-555555555555','Rotavator 7 Feet','Rotavator','Shaktiman','Regular 7ft','Heavy duty rotavator, works with 45 HP and above tractors.','Tractor not included.',600,'Rajasthan','Jaipur','Amer',26.9855,75.8513,null,CURRENT_DATE, CURRENT_DATE + 100,4.6,true),
 ('11111111-1111-4111-8111-111111111111','Seed Drill 11 Tyne','Seed Drill','Landforce','SD-11','Precision seed drill for wheat and gram sowing.','Handle with care, damages chargeable.',450,'Rajasthan','Jaipur','Bagru',26.8145,75.5620,null,CURRENT_DATE, CURRENT_DATE + 80,4.3,true),
 ('22222222-2222-4222-8222-222222222222','Thresher Multicrop','Thresher','Dashmesh','DT-500','Multicrop thresher for wheat, gram and mustard.','Electricity/tractor PTO to be arranged by renter.',700,'Rajasthan','Jaipur','Chomu',27.1667,75.7167,null,CURRENT_DATE, CURRENT_DATE + 60,4.0,false),
 ('33333333-3333-4333-8333-333333333333','Boom Sprayer 400L','Sprayer','Aspee','BS-400','Tractor mounted boom sprayer with 400 litre tank.','Chemicals not included.',350,'Rajasthan','Jaipur','Sanganer',26.8180,75.7900,null,CURRENT_DATE, CURRENT_DATE + 110,4.4,true);

INSERT INTO public.crop_residues (owner_id, residue_type, quantity, unit, price, description, state, district, village, available) VALUES
 ('11111111-1111-4111-8111-111111111111','Wheat Straw',500,'kg',6,'Dry wheat straw (bhusa), good for cattle fodder. Loading help available.','Rajasthan','Jaipur','Bagru',true),
 ('22222222-2222-4222-8222-222222222222','Rice Husk',300,'kg',4,'Clean rice husk, suitable for bedding and biomass fuel.','Rajasthan','Jaipur','Chomu',true),
 ('44444444-4444-4444-8444-444444444444','Mustard Residue',200,'kg',3,'Mustard stalk residue available after harvest.','Rajasthan','Ajmer','Pushkar',true),
 ('55555555-5555-4555-8555-555555555555','Stubble',1000,'quintal',2,'Paddy stubble available for pickup, prevents burning.','Rajasthan','Jaipur','Amer',true);

INSERT INTO public.community_posts (author_id, title, content, category) VALUES
 ('11111111-1111-4111-8111-111111111111','Rotavator ke liye best speed kya hai?','Mere 45 HP tractor ke saath 7 feet rotavator chala raha hoon. Kaun si gear aur RPM par sabse acchi jotai hoti hai?','Machinery'),
 ('33333333-3333-4333-8333-333333333333','PM Kisan Samman Nidhi ki nayi kist','Nayi kist ki e-KYC last date nazdeek hai. Sabhi kisan bhai apne CSC centre par jaakar e-KYC zaroor karwa lein.','Government Schemes'),
 ('44444444-4444-4444-8444-444444444444','Sarson ka bhav Ajmer mandi','Aaj Ajmer mandi mein sarson 5450 rupaye quintal bika. Aage bhav badhne ki ummeed hai.','Prices');
