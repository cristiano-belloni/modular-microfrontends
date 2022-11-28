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
type ManifestCheck = (manifest: Manifest) => boolean;

const views = createContext<
  [
    MicroFrontendState,
    (value: (prevState: MicroFrontendState) => MicroFrontendState) => void,
  ]
>([{}, () => null]);

async function loadRemoteView(
  baseUrl: string,
  loadWithIframeFallback?: ManifestCheck,
): Promise<ComponentType | void> {
  const response = await fetch(`${baseUrl}/package.json`);
  const manifest = (await response.json()) as Manifest;
  const type = manifest?.modular?.type;

  if (type !== 'esm-view' && type !== 'app') {
    throw new Error(
      `Can't load package ${
        manifest.name
      } because type is missing or not supported: ${
        type || JSON.stringify(type)
      }`,
    );
  }

  // Load with iframe if type is app or host decides to use fallback
  if (
    type === 'app' ||
    loadWithIframeFallback.?(manifest)
  ) {
    return () => <iframe title={manifest.name} src={`${baseUrl}/index.html`} />;
  }

  // Load global CSS
  manifest.styleImports?.forEach(injectRemoteCss);

  // Load microfrontend's local style
  if (manifest.style) {
    injectRemoteCss(`${baseUrl}/${manifest.style}`);
  }

  // Dynamically import ESM entrypoint
  if (manifest.module) {
    const { default: LoadedView } = (await import(
      /* webpackIgnore: true */ `${baseUrl}${manifest.module}`
    )) as View;

    return LoadedView;
  }
}

export const useRemoteView = (
  baseUrl: string,
  loadWithIframeFallback?: ManifestCheck,
): React.ComponentType | null => {
  const [state, setState] = useContext(views);
  const current = state[baseUrl];

  useEffect(() => {
    if (current !== undefined) {
      return;
    }

    void loadRemoteView(baseUrl, loadWithIframeFallback).then((LoadedView) => {
      LoadedView && setState((old) => ({ ...old, [baseUrl]: LoadedView }));
    });
  }, [current, baseUrl, setState, loadWithIframeFallback]);

  if (current === undefined) {
    setState((prev) => ({ ...prev, [baseUrl]: loading }));
    return null;
  }

  if (current === loading) {
    return null;
  }

  return current;
};

function injectRemoteCss(url: string) {
  const node = document.head;

  if (node.querySelector(`link[href="${url}"]`)) {
    return;
  }

  node.insertAdjacentHTML(
    'beforeend',
    `<link rel='stylesheet' href='${url}' />`,
  );
}

export const RemoteViews = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const value = useState<MicroFrontendState>({});
  return <views.Provider value={value}>{children}</views.Provider>;
};

export const RemoteView = ({
  baseUrl,
  loadWithIframeFallback,
}: {
  baseUrl: string;
  loadWithIframeFallback?: ManifestCheck;
}): JSX.Element => {
  const ViewComponent = useRemoteView(baseUrl, loadWithIframeFallback);
  return (ViewComponent && <ViewComponent />) || <div>Loading</div>;
};
