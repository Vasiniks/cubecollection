// A ~40-line router. The exhibition has a small, stable set of routes and no
// need for nested layouts or loaders, so a dependency would cost more in bundle
// size and indirection than it returns.

import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'makers' }
  | { name: 'maker'; id: string }
  | { name: 'model'; id: string }
  | { name: 'variant'; modelId: string; id: string }
  | { name: 'conventions' }
  | { name: 'notFound'; path: string };

export function parse(pathname: string): Route {
  const seg = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (seg.length === 0) return { name: 'home' };
  const [a, b, c, d] = seg;
  if (a === 'makers' && !b) return { name: 'makers' };
  if (a === 'makers' && b) return { name: 'maker', id: b };
  if (a === 'models' && b && c === 'variants' && d) return { name: 'variant', modelId: b, id: d };
  if (a === 'models' && b) return { name: 'model', id: b };
  if (a === 'conventions') return { name: 'conventions' };
  return { name: 'notFound', path: pathname };
}

export function href(route: Route): string {
  switch (route.name) {
    case 'home': return '/';
    case 'makers': return '/makers';
    case 'maker': return `/makers/${route.id}`;
    case 'model': return `/models/${route.id}`;
    case 'variant': return `/models/${route.modelId}/variants/${route.id}`;
    case 'conventions': return '/conventions';
    case 'notFound': return route.path;
  }
}

export function navigate(to: string): void {
  if (to === window.location.pathname) return;
  window.history.pushState(null, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(window.location.pathname));
  useEffect(() => {
    const onPop = () => setRoute(parse(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return route;
}
