// src/hooks/useClarityPageview.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useClarityPageview() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    // fire a lightweight custom event on route change
    (window as any).clarity?.('event', 'route_change');
  }, [pathname, search]);
}
