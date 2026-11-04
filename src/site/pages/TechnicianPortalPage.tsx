import { Smartphone } from 'lucide-react';
import RequestForm from '@/site/components/portal/RequestForm';

export default function TechnicianPortalPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 animate-fadeUp">
        <span className="inline-flex items-center gap-2 rounded-full bg-steel-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-steel-700 dark:bg-steel-900 dark:text-steel-300">
          <Smartphone className="h-3.5 w-3.5" />
          Portal do Técnico
        </span>
        <h1 className="mt-4 text-5xl font-bold text-graphite-950 dark:text-white sm:text-6xl">Requisitar peça</h1>
        <p className="mt-3 text-base leading-relaxed text-graphite-600 dark:text-graphite-300">
          Preencha os campos abaixo com a máquina parada ou o defeito em mãos. Quanto mais preciso o pedido, mais rápida a compra.
        </p>
      </header>
      <RequestForm />
    </div>
  );
}
