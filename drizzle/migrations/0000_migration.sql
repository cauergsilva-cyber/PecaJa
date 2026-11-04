CREATE TABLE public.pedidos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment text NOT NULL,
  serial_number text NOT NULL DEFAULT '',
  part_name text NOT NULL,
  reference_code text NOT NULL DEFAULT '',
  photo_data_url text,
  urgency text NOT NULL DEFAULT 'media' CHECK (urgency IN ('baixa','media','critica')),
  symptoms text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','cotacao','comprado','entregue')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.pedidos TO authenticated;
GRANT ALL ON public.pedidos TO service_role;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "painel le pedidos" ON public.pedidos FOR SELECT TO authenticated USING (true);
CREATE POLICY "painel muda status" ON public.pedidos FOR UPDATE TO authenticated USING (true) WITH CHECK (true);