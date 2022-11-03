import React, {
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Manifest, View } from '../types';

const loading = Symbol('loading');
type MicroFrontendState = Record<string, React.ComponentType | typeof loading>;

const views = createContext<
  [
    MicroFrontendState,
    (value: (prevState: MicroFrontendState) => MicroFrontendState) => void,
  ]
>([{}, () => null]);

async function loadRemoteView(baseUrl: string): Promise<ComponentType | void> {
  const response = await fetch(`${baseUrl}/package.json`);
  const manifest = (await response.json()) as Manifest;

  // TODO: check for (and eventually load) global CSS

  // Load microfrontend's local style
  if (manifest.style) {
    document.head.insertAdjacentHTML(
      'beforeend',
      `<link rel='stylesheet' href='${baseUrl}${manifest.style}' />`,
    );
  }

  // Dynamically import ESM entrypoint
  if (manifest.module) {
    const { default: LoadedView } = (await import(
      /* webpackIgnore: true */ `${baseUrl}${manifest.module}`
    )) as View;

    return LoadedView;
  }
}

export const useRemoteView = (baseUrl: string): React.ComponentType | null => {
  const [state, setState] = useContext(views);
  const current = state[baseUrl];

  useEffect(() => {
    if (current !== undefined) {
      return;
    }

    void loadRemoteView(baseUrl).then((LoadedView) => {
      LoadedView && setState((old) => ({ ...old, [baseUrl]: LoadedView }));
    });
  }, [current, baseUrl, setState]);

  if (current === undefined) {
    setState((prev) => ({ ...prev, [baseUrl]: loading }));
    return null;
  }

  if (current === loading) {
    return null;
  }

  return current;
};

export const RemoteViews = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const value = useState<MicroFrontendState>({});
  return <views.Provider value={value}>{children}</views.Provider>;
};

export const RemoteView = ({ baseUrl }: { baseUrl: string }): JSX.Element => {
  const ViewComponent = useRemoteView(baseUrl);
  return (ViewComponent && <ViewComponent />) || <div>Loading</div>;
};
