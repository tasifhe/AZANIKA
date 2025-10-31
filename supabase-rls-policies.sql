-- Enable Row Level Security on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access to products" ON public.products;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Allow public to create orders" ON public.orders;
DROP POLICY IF EXISTS "Allow viewing order items" ON public.order_items;
DROP POLICY IF EXISTS "Allow creating order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;

-- PRODUCTS: Allow public read access (everyone can view products)
CREATE POLICY "Allow public read access to products"
ON public.products FOR SELECT
TO public
USING (true);

-- PRODUCTS: Allow authenticated users and service role to insert/update/delete
CREATE POLICY "Allow authenticated users to manage products"
ON public.products FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ORDERS: Allow public to create orders (for guest checkout)
CREATE POLICY "Allow public to create orders"
ON public.orders FOR INSERT
TO public
WITH CHECK (true);

-- ORDERS: Allow public to view orders (API will filter by customer_email in application logic)
CREATE POLICY "Allow public to view orders"
ON public.orders FOR SELECT
TO public
USING (true);

-- ORDERS: Allow authenticated users to update orders
CREATE POLICY "Allow authenticated users to update orders"
ON public.orders FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- ORDERS: Allow authenticated users to delete orders
CREATE POLICY "Allow authenticated users to delete orders"
ON public.orders FOR DELETE
TO authenticated
USING (true);

-- ORDER_ITEMS: Allow public to view order items
CREATE POLICY "Allow public to view order items"
ON public.order_items FOR SELECT
TO public
USING (true);

-- ORDER_ITEMS: Allow public to create order items
CREATE POLICY "Allow public to create order items"
ON public.order_items FOR INSERT
TO public
WITH CHECK (true);

-- ORDER_ITEMS: Allow authenticated users to manage order items
CREATE POLICY "Allow authenticated users to manage order items"
ON public.order_items FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- USERS: Allow public to create users (registration)
CREATE POLICY "Allow public to create users"
ON public.users FOR INSERT
TO public
WITH CHECK (true);

-- USERS: Allow users to view all users (you can restrict this later)
CREATE POLICY "Allow public to view users"
ON public.users FOR SELECT
TO public
USING (true);

-- USERS: Allow authenticated users to update users
CREATE POLICY "Allow authenticated users to update users"
ON public.users FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Fix the function search_path issue
ALTER FUNCTION public.update_updated_at_column() SECURITY DEFINER SET search_path = public;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Row Level Security policies have been successfully applied!';
  RAISE NOTICE 'All tables now have RLS enabled with appropriate policies.';
END $$;
