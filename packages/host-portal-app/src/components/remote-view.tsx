import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Manifest, View } from '../types';

const loading = Symbol('loading');

type MicroFrontendState = Record<string, React.ComponentType | typeof loading>;
type GlobalStylesheetSet = Set<string>;
type RemoteViewsContext = {
  microFrontends: [
    MicroFrontendState,
    (value: (prevState: MicroFrontendState) => MicroFrontendState) => void,
  ];
  globalStyles: [
    GlobalStylesheetSet,
    (value: (prevState: GlobalStylesheetSet) => GlobalStylesheetSet) => void,
  ];
};

export const viewContext = createContext<RemoteViewsContext>(
  {} as RemoteViewsContext,
);

export const useRemoteView = (baseUrl: string): React.ComponentType | null => {
  const {
    microFrontends: [microFrontendsState, setMicroFrontendsState],
    globalStyles: [globalStylesState, setGlobalStylesState],
  } = useContext(viewContext);

  const current = microFrontendsState[baseUrl];

  useEffect(() => {
    if (current === undefined) {
      void loadRemoteView();
    }

    async function loadRemoteView() {
      const manifest = await loadRemoteManifest(baseUrl);

      // Load local CSS via manifest "style" field
      if (manifest.style) {
        injectRemoteCss(`${baseUrl}${manifest.style}`);
      }

      // Load global (CDN) CSS via manifest "styleImports" field and make sure it's not been already injected in the page
      manifest.styleImports?.forEach((url) => {
        if (!globalStylesState.has(url)) {
          setGlobalStylesState((globalStyles) => globalStyles.add(url));
          injectRemoteCss(url);
        }
      });

      // Load module
      const LoadedView = await importRemoteModule(
        `${baseUrl}${manifest.module}`,
      );
      setMicroFrontendsState((prev) => ({ ...prev, [baseUrl]: LoadedView }));
    }
  }, [
    current,
    baseUrl,
    setMicroFrontendsState,
    globalStylesState,
    setGlobalStylesState,
  ]);

  if (current === undefined) {
    setMicroFrontendsState((prev) => ({ ...prev, [baseUrl]: loading }));
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
  const microFrontends = useState<MicroFrontendState>({});
  const globalStyles = useState<GlobalStylesheetSet>(new Set());
  return (
    <viewContext.Provider value={{ microFrontends, globalStyles }}>
      {children}
    </viewContext.Provider>
  );
};

export const RemoteView = ({ baseUrl }: { baseUrl: string }): JSX.Element => {
  const ViewComponent = useRemoteView(baseUrl);
  return (ViewComponent && <ViewComponent />) || <div>Loading</div>;
};

function injectRemoteCss(url: string) {
  document.head.insertAdjacentHTML(
    'beforeend',
    `<link rel='stylesheet' href='${url}' />`,
  );
}

async function loadRemoteManifest(baseUrl: string) {
  const response = await fetch(`${baseUrl}/package.json`);
  const manifest = (await response.json()) as Manifest;
  return manifest;
}

async function importRemoteModule(url: string) {
  const { default: LoadedView } = (await import(
    /* webpackIgnore: true */ url
  )) as View;

  return LoadedView;
}
