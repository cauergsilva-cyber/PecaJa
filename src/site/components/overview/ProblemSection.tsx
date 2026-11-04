import { Ban, Clock, MessageSquare, Siren } from 'lucide-react';

const PAIN_POINTS = [
  {
    icon: MessageSquare,
    title: 'Pedidos soltos',
    text: 'Técnicos pedem peças por mensagens, papéis e ligações. Nada fica registrado nem padronizado.',
  },
  {
    icon: Ban,
    title: 'Compras erradas',
    text: 'Sem número de série e código de referência, o estoque compra a peça errada ou incompatível.',
  },
  {
    icon: Clock,
    title: 'Atrasos no processo',
    text: 'Cada pedido precisa ser reconstruído do zero, consumindo tempo de técnicos e compradores.',
  },
  {
    icon: Siren,
    title: 'Máquinas paradas',
    text: 'Equipamentos parados geram prejuízo direto em produção, horas extras e perda de prazos.',
  },
];

export default function ProblemSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-alert-600 dark:text-alert-300">
          01 · O problema
        </p>
        <h2 className="text-4xl font-bold text-graphite-950 dark:text-white sm:text-5xl">
          Pedidos de peças dispersos custam caro para a fábrica
        </h2>
        <p className="mt-5 text-base leading-relaxed text-graphite-600 dark:text-graphite-300">
          Hoje, a requisição de uma peça de manutenção começa em uma mensagem no celular, um bilhete de papel ou uma
          conversa no corredor. O estoque interpreta, o comprador pergunta de novo e a peça certa só chega dias
          depois, quando a máquina já parou.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PAIN_POINTS.map((item) => (
          <article
            key={item.title}
            className="panel group p-6 transition duration-300 hover:-translate-y-1 hover:border-alert-400/60 hover:shadow-lg"
          >
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-steel-100 text-steel-700 transition group-hover:bg-alert-100 group-hover:text-alert-700 dark:bg-steel-900 dark:text-steel-300 dark:group-hover:bg-alert-500/15 dark:group-hover:text-alert-300">
              <item.icon className="h-5 w-5" />
            </span>
            <h3 className="text-xl font-semibold text-graphite-900 dark:text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-graphite-600 dark:text-graphite-300">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
