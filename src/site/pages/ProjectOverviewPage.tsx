import { ClipboardCheck } from 'lucide-react';
import type { PageId } from '@/site/hooks/usePageRoute';
import AlternativesSection from '@/site/components/overview/AlternativesSection';
import ChosenIdeaSection from '@/site/components/overview/ChosenIdeaSection';
import ProblemSection from '@/site/components/overview/ProblemSection';

interface ProjectOverviewPageProps {
  onNavigate: (page: PageId) => void;
}

export default function ProjectOverviewPage({ onNavigate }: ProjectOverviewPageProps) {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-steel-950 text-white">
        <img
          src="https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Engenheiro inspecionando maquinário em ambiente industrial"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-steel-950 via-steel-950/85 to-steel-950/40" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8 lg:py-28">
          <div className="animate-fadeUp">
            <span className="inline-flex items-center gap-2 rounded-full border border-alert-400/40 bg-alert-500/10 px-4 py-1.5 text-sm font-semibold text-alert-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-alert-400" />
              Projeto de melhoria · Manutenção e estoque
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              Requisição de Peças de <span className="text-alert-400">Manutenção</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-200">
              Um fluxo digital único para o técnico pedir peças com precisão e para o estoque e as compras acompanharem
              cada pedido até a entrega.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => onNavigate('portal')} className="btn-primary">
                <ClipboardCheck className="h-5 w-5" />
                Abrir Portal do Técnico
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-4 py-20 sm:px-6 lg:px-8">
        <ProblemSection />
        <AlternativesSection />
        <ChosenIdeaSection onNavigate={onNavigate} />
      </div>
    </div>
  );
}
