'use client';

import { Provider } from 'react-redux';
import { store } from '../../store/store';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}