'use client';
import { Provider } from 'react-redux';
import { setupStore } from './store';

const store = setupStore();

export const Providers = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>;
};
