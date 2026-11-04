import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import type { MaintenanceRequest, NewRequestInput } from '@/site/types/maintenance';

// Pedidos são gravados no banco compartilhado com o painel (/painel).
// Público por design: só insere campos validados e força status "pendente".
const schema = z.object({
  equipment: z.string().trim().min(1).max(200),
  serialNumber: z.string().trim().max(120).default(''),
  partName: z.string().trim().min(1).max(200),
  referenceCode: z.string().trim().max(120).default(''),
  photoDataUrl: z.string().max(4_000_000).regex(/^data:image\//).nullable(),
  urgency: z.enum(['baixa', 'media', 'critica']),
  symptoms: z.string().trim().max(2000).default(''),
});

export const createRequest = createServerFn({ method: 'POST' })
  .inputValidator((d: NewRequestInput) => schema.parse(d))
  .handler(async ({ data: d }): Promise<MaintenanceRequest> => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data, error } = await supabaseAdmin
      .from('pedidos')
      .insert({
        equipment: d.equipment,
        serial_number: d.serialNumber,
        part_name: d.partName,
        reference_code: d.referenceCode,
        photo_data_url: d.photoDataUrl,
        urgency: d.urgency,
        symptoms: d.symptoms,
      })
      .select('id, status, created_at, updated_at')
      .single();
    if (error || !data) throw new Error('Falha ao salvar o pedido');
    return {
      ...d,
      id: data.id,
      status: 'pendente',
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  });
