import React, {
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Manifest, MicroFrontendState, View } from '../types';

const views = createContext<[MicroFrontendState, (value: (prevState: MicroFrontendState) => MicroFrontendState) => void]>([]);

const loading = Symbol('loading');

async function loadRemoteView(baseUrl: string): Promise<ComponentType | void> {
  const response = await fetch(`${baseUrl}/package.json`);
  const manifest = (await response.json()) as Manifest;

  if (manifest.style) {
    document.head.insertAdjacentHTML(
      'beforeend',
      `<link rel='stylesheet' href='${baseUrl}${manifest.style}' />`,
    );
  }

  if (manifest.module) {
    const { default: View } = await import(
      /* webpackIgnore: true */ `${baseUrl}${manifest.module}`
      );

    return View;
  }
}

export const useRemoteView = (baseUrl) => {
  const [state, setState] = useContext(views);
  const current = state[baseUrl];

  useEffect(() => {
    if (current !== undefined) {
      return;
    }

    loadRemoteView(baseUrl).then(View => {
      View && setState(old => ({ ...old, [baseUrl]: View }));
    });
  }, [current]);

  if (current === undefined) {
    setState(prev => ({ ...prev, [baseUrl]: loading }));
    return null;
  }

  if (current === loading) {
    return null;
  }

  return current;
};

export const RemoteViews = ({ children }: PropsWithChildren<{}>) => {
  const value = useState<MicroFrontendState>({});
  return <views.Provider value={value}>
    {children}
  </views.Provider>;
};

export const RemoteView = ({ baseUrl }: { baseUrl: string }) => {
  const View = useRemoteView(baseUrl);
  return View && <View /> || <div>Loading</div>;
};

