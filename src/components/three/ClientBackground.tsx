'use client';

import dynamic from 'next/dynamic';

const BackgroundCanvas = dynamic(
  () => import('./BackgroundCanvas').then((m) => m.BackgroundCanvas),
  { ssr: false, loading: () => null },
);

export function ClientBackground() {
  return <BackgroundCanvas />;
}
