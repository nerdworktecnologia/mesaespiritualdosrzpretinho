
CREATE TABLE public.consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  birth_date TEXT,
  question TEXT,
  tema TEXT DEFAULT 'geral',
  cabala_superior TEXT,
  cabala_inferior TEXT,
  cabala_lateral TEXT,
  cabala_central TEXT,
  cabala_final TEXT,
  buzios_abertos INTEGER,
  buzios_odu TEXT,
  tarot_cards INTEGER[],
  tarot_card_names TEXT[],
  interpretation_destino TEXT,
  interpretation_energia TEXT,
  interpretation_situacao TEXT,
  interpretation_orientacao TEXT,
  interpretation_resumo TEXT,
  reading_type TEXT DEFAULT 'painel',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Disable RLS since this is a single-user professional tool (no auth)
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to consultations" ON public.consultations FOR ALL USING (true) WITH CHECK (true);
