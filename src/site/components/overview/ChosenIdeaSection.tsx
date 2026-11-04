import { ArrowRight, Gauge, ShieldCheck, Wallet } from 'lucide-react';
import type { PageId } from '@/site/hooks/usePageRoute';

const BENEFITS = [
  {
    icon: Gauge,
    title: 'Implantação rápida',
    text: 'Funciona no navegador do celular, sem instalar aplicativos nem configurar equipamentos.',
  },
  {
    icon: Wallet,
    title: 'Baixo custo',
    text: 'Usa ferramentas simples e um único sistema centralizado, sem hardware novo nas máquinas.',
  },
  {
    icon: ShieldCheck,
    title: 'Sem erro humano',
    text: 'Campos obrigatórios, foto da peça e número de série eliminam pedidos incompletos ou ambíguos.',
  },
];

interface ChosenIdeaSectionProps {
  onNavigate: (page: PageId) => void;
}

export default function ChosenIdeaSection({ onNavigate }: ChosenIdeaSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-steel-950 p-8 text-white shadow-2xl sm:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-alert-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <div className="relative">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-alert-400">03 · Ideia escolhida</p>
        <h2 className="max-w-3xl text-4xl font-bold sm:text-5xl">
          Formulário Digital Padronizado: o pedido certo, na primeira vez
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-200">
          Entre as cinco alternativas, o formulário digital entrega o melhor equilíbrio entre velocidade, custo e
          qualidade da informação. Cada pedido chega ao estoque completo, com foto, série e urgência definidas.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {BENEFITS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-steel-800 bg-steel-900/70 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-alert-400/50"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-alert-500 text-graphite-950">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-200">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => onNavigate('portal')} className="btn-primary">
            Testar o Portal do Técnico
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
