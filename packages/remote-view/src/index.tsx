import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

export type AppRegView = {
  name: string;
  root: string;
  manifest: string;
};

export interface Manifest {
  module: string;
  style?: string;
  styleImports?: string[];
}

export interface ViewModule {
  default: React.ComponentType;
}

const loading = Symbol('loading');

export type MicroFrontendState = Record<
  string,
  React.ComponentType | typeof loading
>;
export type GlobalStylesheetSet = Set<string>;
export type RemoteViewsContext = {
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

export function useRemoteView(baseUrl: string): React.ComponentType | null {
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
}

export function RemoteViews({
  children,
}: PropsWithChildren<unknown>): JSX.Element {
  const microFrontends = useState<MicroFrontendState>({});
  const globalStyles = useState<GlobalStylesheetSet>(new Set());
  return (
    <viewContext.Provider value={{ microFrontends, globalStyles }}>
      {children}
    </viewContext.Provider>
  );
}

export function RemoteView({ baseUrl }: { baseUrl: string }): JSX.Element {
  const ViewComponent = useRemoteView(baseUrl);
  return (ViewComponent && <ViewComponent />) || <div>Loading</div>;
}

export function injectRemoteCss(url: string): void {
  document.head.insertAdjacentHTML(
    'beforeend',
    `<link rel='stylesheet' href='${url}' />`,
  );
}

export async function loadRemoteManifest(baseUrl: string): Promise<Manifest> {
  const response = await fetch(`${baseUrl}/package.json`);
  const manifest = (await response.json()) as Manifest;
  return manifest;
}

async function importRemoteModule(url: string): Promise<React.ComponentType> {
  const { default: LoadedView } = (await import(
    /* webpackIgnore: true */ url
  )) as ViewModule;

  return LoadedView;
}
