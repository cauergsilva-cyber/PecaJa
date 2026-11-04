export type Urgency = 'baixa' | 'media' | 'critica';

export type RequestStatus = 'pendente' | 'cotacao' | 'comprado' | 'entregue';

export interface MaintenanceRequest {
  id: string;
  equipment: string;
  serialNumber: string;
  partName: string;
  referenceCode: string;
  photoDataUrl: string | null;
  urgency: Urgency;
  symptoms: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

export type NewRequestInput = Pick<
  MaintenanceRequest,
  'equipment' | 'serialNumber' | 'partName' | 'referenceCode' | 'photoDataUrl' | 'urgency' | 'symptoms'
>;

export const URGENCY_LABELS: Record<Urgency, string> = {
  baixa: 'Baixa',
  media: 'Média',
  critica: 'Crítica · Máquina parada',
};

export const STATUS_LABELS: Record<RequestStatus, string> = {
  pendente: 'Pendente',
  cotacao: 'Em cotação',
  comprado: 'Comprado',
  entregue: 'Entregue',
};

export const STATUS_ORDER: RequestStatus[] = ['pendente', 'cotacao', 'comprado', 'entregue'];
