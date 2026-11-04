import { Moon, Sun, Wrench } from 'lucide-react';
import type { PageId } from '@/site/hooks/usePageRoute';
import type { ThemeMode } from '@/site/hooks/useTheme';

interface SiteHeaderProps {
  page: PageId;
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'apresentacao', label: 'Apresentação' },
  { id: 'portal', label: 'Portal do Técnico' },
];

export default function SiteHeader({ page, onNavigate, theme, onToggleTheme }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-steel-900/60 bg-steel-950/95 text-steel-50 backdrop-blur supports-[backdrop-filter]:bg-steel-950/85">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate('apresentacao')}
          className="flex shrink-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-alert-400"
          aria-label="Ir para a apresentação do projeto"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-alert-500 text-graphite-950 shadow-lg shadow-alert-500/20">
            <Wrench className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="hidden text-left leading-tight md:block">
            <span className="block font-display text-lg font-bold uppercase tracking-wide">Manutenção</span>
            <span className="block text-xs font-medium text-steel-300">Requisição de peças</span>
          </span>
        </button>

        <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-xl bg-steel-900/70 p-1" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => {
            const active = item.id === page;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 sm:px-4 ${
                  active
                    ? 'bg-alert-500 text-graphite-950 shadow-md shadow-alert-500/20'
                    : 'text-steel-200 hover:bg-steel-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>


        <button
          type="button"
          onClick={onToggleTheme}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-steel-700 bg-steel-900 text-steel-100 transition hover:border-alert-400 hover:text-alert-300"
          aria-label={theme === 'escuro' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          title={theme === 'escuro' ? 'Modo claro' : 'Modo escuro'}
        >
          {theme === 'escuro' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}
