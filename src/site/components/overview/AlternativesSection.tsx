import { Bell, CheckCircle2, ClipboardList, Columns3, Pin, QrCode, type LucideIcon } from 'lucide-react';

interface Alternative {
  icon: LucideIcon;
  title: string;
  text: string;
  pros: string;
  cons: string;
  chosen?: boolean;
}

const ALTERNATIVES: Alternative[] = [
  {
    icon: QrCode,
    title: 'Catálogo Visual com QR Code',
    text: 'Etiquetas com QR Code em cada máquina levam a um catálogo de peças com fotos.',
    pros: 'Visual e fácil de entender',
    cons: 'Exige etiquetagem de todo o parque e manutenção do catálogo',
  },
  {
    icon: Columns3,
    title: 'Quadro Kanban Físico',
    text: 'Cartões de pedido circulam em um quadro com colunas de status no almoxarifado.',
    pros: 'Baixíssimo custo inicial',
    cons: 'Cartões se perdem, não há histórico nem busca',
  },
  {
    icon: ClipboardList,
    title: 'Formulário Digital Padronizado',
    text: 'Um formulário único, com campos obrigatórios, acessado pelo celular do técnico.',
    pros: 'Rápido de implantar, baixo custo e registro completo',
    cons: 'Depende de o técnico ter acesso a um celular ou tablet',
    chosen: true,
  },
  {
    icon: Pin,
    title: 'Mural Metálico de Moldes',
    text: 'Um mural com fichas magnéticas e moldes físicos das peças mais usadas.',
    pros: 'Tátil e sem tecnologia',
    cons: 'Não cobre peças raras e não gera dados para compras',
  },
  {
    icon: Bell,
    title: 'Notificação via Bot de Mensagem',
    text: 'Um robô de mensagens recebe o pedido e avisa o estoque em tempo real.',
    pros: 'Integra com o celular que o técnico já usa',
    cons: 'Exige integração com plataformas externas e mais custo',
  },
];

export default function AlternativesSection() {
  return (
    <section className="space-y-10">
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-alert-600 dark:text-alert-300">
          02 · Alternativas avaliadas
        </p>
        <h2 className="text-4xl font-bold text-graphite-950 dark:text-white sm:text-5xl">
          Cinco caminhos, uma escolha
        </h2>
        <p className="mt-4 text-base leading-relaxed text-graphite-600 dark:text-graphite-300">
          Cada ideia foi avaliada por rapidez de implantação, custo, facilidade de uso e eliminação de erros humanos.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {ALTERNATIVES.map((item, index) => (
          <article
            key={item.title}
            className={`relative flex flex-col rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
              item.chosen
                ? 'border-alert-400 bg-steel-950 text-white shadow-lg shadow-alert-500/15 ring-2 ring-alert-400/40 dark:bg-steel-900'
                : 'panel'
            }`}
          >
            <div className="mb-5 flex items-start justify-between">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  item.chosen ? 'bg-alert-500 text-graphite-950' : 'bg-steel-100 text-steel-700 dark:bg-steel-900 dark:text-steel-300'
                }`}
              >
                <item.icon className="h-6 w-6" />
              </span>
              <span
                className={`font-display text-4xl font-bold leading-none ${
                  item.chosen ? 'text-alert-400' : 'text-graphite-200 dark:text-graphite-700'
                }`}
              >
                0{index + 1}
              </span>
            </div>

            <h3 className={`text-2xl font-semibold ${item.chosen ? 'text-white' : 'text-graphite-900 dark:text-white'}`}>
              {item.title}
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${item.chosen ? 'text-steel-200' : 'text-graphite-600 dark:text-graphite-300'}`}>
              {item.text}
            </p>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex gap-2">
                <dt className="shrink-0 font-semibold text-emerald-700 dark:text-emerald-400">Prós:</dt>
                <dd className={item.chosen ? 'text-steel-100' : 'text-graphite-700 dark:text-graphite-200'}>{item.pros}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0 font-semibold text-red-700 dark:text-red-400">Contras:</dt>
                <dd className={item.chosen ? 'text-steel-100' : 'text-graphite-700 dark:text-graphite-200'}>{item.cons}</dd>
              </div>
            </dl>

            {item.chosen && (
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-alert-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-graphite-950">
                <CheckCircle2 className="h-4 w-4" />
                Escolha final
              </span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
