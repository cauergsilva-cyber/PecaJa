import ProjectOverviewPage from '@/site/pages/ProjectOverviewPage';
import TechnicianPortalPage from '@/site/pages/TechnicianPortalPage';
import SiteHeader from '@/site/components/layout/SiteHeader';
import { usePageRoute } from '@/site/hooks/usePageRoute';
import { useTheme } from '@/site/hooks/useTheme';

export default function App() {
  const { page, setPage } = usePageRoute();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col bg-graphite-50 text-graphite-900 transition-colors duration-300 dark:bg-graphite-950 dark:text-graphite-100">
      <SiteHeader page={page} onNavigate={setPage} theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-1">
        {page === 'apresentacao' && <ProjectOverviewPage onNavigate={setPage} />}
        {page === 'portal' && <TechnicianPortalPage />}
      </main>
    </div>
  );
}
