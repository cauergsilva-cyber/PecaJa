import { AlertTriangle, Leaf, Siren, type LucideIcon } from 'lucide-react';
import { URGENCY_LABELS, type Urgency } from '@/site/types/maintenance';

const URGENCY_STYLES: Record<
  Urgency,
  { icon: LucideIcon; description: string; idle: string; active: string; dot: string }
> = {
  baixa: {
    icon: Leaf,
    description: 'Pode aguardar o próximo ciclo',
    idle: 'border-graphite-200 hover:border-emerald-500/60 dark:border-graphite-700 dark:hover:border-emerald-500/60',
    active: 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-500/20 dark:bg-emerald-500/10',
    dot: 'bg-emerald-500',
  },
  media: {
    icon: AlertTriangle,
    description: 'Afeta a produção, sem parar a máquina',
    idle: 'border-graphite-200 hover:border-amber-400/70 dark:border-graphite-700 dark:hover:border-amber-400/70',
    active: 'border-amber-400 bg-amber-50 ring-4 ring-amber-400/25 dark:bg-amber-400/10',
    dot: 'bg-amber-400',
  },
  critica: {
    icon: Siren,
    description: 'Máquina parada, prioridade total',
    idle: 'border-graphite-200 hover:border-red-500/60 dark:border-graphite-700 dark:hover:border-red-500/60',
    active: 'border-red-500 bg-red-50 ring-4 ring-red-500/20 dark:bg-red-500/10',
    dot: 'bg-red-500',
  },
};

interface UrgencySelectorProps {
  value: Urgency | null;
  onChange: (urgency: Urgency) => void;
  invalid: boolean;
}

export default function UrgencySelector({ value, onChange, invalid }: UrgencySelectorProps) {
  return (
    <div role="radiogroup" aria-label="Nível de urgência" className="grid gap-3 sm:grid-cols-3">
      {(Object.keys(URGENCY_STYLES) as Urgency[]).map((urgency) => {
        const style = URGENCY_STYLES[urgency];
        const selected = value === urgency;
        return (
          <button
            key={urgency}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(urgency)}
            className={`group flex min-h-[88px] flex-col items-start gap-2 rounded-2xl border-2 bg-white p-4 text-left transition duration-200 active:scale-[0.98] dark:bg-graphite-950 ${
              selected ? style.active : style.idle
            } ${invalid && !selected ? 'border-red-400/60' : ''}`}
          >
            <span className="flex items-center gap-2 font-semibold text-graphite-900 dark:text-white">
              <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
              {URGENCY_LABELS[urgency]}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-graphite-500 dark:text-graphite-400">
              <style.icon className="h-3.5 w-3.5" />
              {style.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
