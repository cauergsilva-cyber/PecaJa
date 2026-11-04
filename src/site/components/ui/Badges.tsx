import { STATUS_LABELS, URGENCY_LABELS, type RequestStatus, type Urgency } from '@/site/types/maintenance';

const URGENCY_BADGE: Record<Urgency, string> = {
  baixa: 'bg-emerald-100 text-emerald-800 ring-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/30',
  media: 'bg-amber-100 text-amber-800 ring-amber-500/30 dark:bg-amber-400/15 dark:text-amber-300 dark:ring-amber-400/30',
  critica: 'bg-red-100 text-red-700 ring-red-600/25 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-400/30',
};

const STATUS_BADGE: Record<RequestStatus, string> = {
  pendente: 'bg-graphite-100 text-graphite-700 ring-graphite-400/30 dark:bg-graphite-800 dark:text-graphite-200 dark:ring-graphite-600',
  cotacao: 'bg-steel-100 text-steel-800 ring-steel-500/30 dark:bg-steel-800/60 dark:text-steel-100 dark:ring-steel-500/40',
  comprado: 'bg-alert-100 text-alert-800 ring-alert-500/30 dark:bg-alert-500/15 dark:text-alert-200 dark:ring-alert-400/30',
  entregue: 'bg-emerald-100 text-emerald-800 ring-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/30',
};

const BADGE_BASE = 'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset';

export function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  return <span className={`${BADGE_BASE} ${URGENCY_BADGE[urgency]}`}>{URGENCY_LABELS[urgency]}</span>;
}

export function StatusBadge({ status }: { status: RequestStatus }) {
  return <span className={`${BADGE_BASE} ${STATUS_BADGE[status]}`}>{STATUS_LABELS[status]}</span>;
}
