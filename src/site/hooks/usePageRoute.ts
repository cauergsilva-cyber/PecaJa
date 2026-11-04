import { useCallback, useEffect, useState } from 'react';

export type PageId = 'apresentacao' | 'portal';

const PAGE_IDS: PageId[] = ['apresentacao', 'portal'];

const parsePage = (hash: string): PageId => {
  const id = hash.replace('#', '') as PageId;
  return PAGE_IDS.includes(id) ? id : 'apresentacao';
};

export const usePageRoute = () => {
  const [page, setPageState] = useState<PageId>(() => parsePage(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setPageState(parsePage(window.location.hash));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setPage = useCallback((next: PageId) => {
    window.location.hash = next;
  }, []);

  return { page, setPage };
};
