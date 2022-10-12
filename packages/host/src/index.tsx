import * as React from 'react';
import './index.css';

interface Manifest {
  module: string;
  style?: string;
}

interface View {
  default: React.ComponentType;
}

type MicroFrontendState = Record<string, React.ComponentType>;

const registry: Record<string, string> = {
  view1: 'http://localhost:5001',
  view2: 'http://localhost:5002',
};

export default function EsmView(): JSX.Element {
  const [state, setState] = React.useState<MicroFrontendState>({});

  const loadView = React.useCallback(
    async (baseUrl: string, name: string) => {
      const response = await fetch(`${baseUrl}/package.json`);
      const manifest = (await response.json()) as Manifest;

      console.info(
        'Manifest loaded for name',
        name,
        'at url',
        baseUrl,
        manifest,
      );

      if (manifest.module) {
        void import(
          /* webpackIgnore: true */ `${baseUrl}${manifest.module}`
        ).then((AsyncModule) =>
          setState((oldState) => ({
            ...oldState,
            [name]: (AsyncModule as View).default,
          })),
        );
      }

      // TODO: load the esm-view's local style, if present
      /* if (manifest.style) {
        // ...
      }*/
    },
    [setState],
  );

  console.log(state.view1);

  return (
    <div className="Container">
      {Object.entries(registry).map(([name, url]) => {
        const View = state[name];
        return (
          <div className="View">
            {View ? (
              <View />
            ) : (
              <button onClick={() => loadView(url, name)}>Load {name}</button>
            )}
          </div>
        );
      })}
    </div>
  );
}
