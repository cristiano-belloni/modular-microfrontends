# Modular Micro-Front End Portal

## Remote View

Simple collection of components, utilities and hooks to load and manage
micro-frontends using Modular `esm-view`s.

### Quick start

```tsx
import { RemoteView, RemoteViews } from 'remote-view';

// Every <RemoteView /> rendered inside a <RemoteViews /> context
// imports (if needed) and renders the esm-view served at baseUrl.
// Local and global CSS in the esm-view manifest is automatically loaded and de-duplicated.
export function Host({ remoteViews }) {
  <RemoteViews>
    {remoteViews.map((v, index) => (
      <RemoteView baseUrl={v} key={index} />
    ))}
  </RemoteViews>;
}
```

## Run the examples

Create apps from templates:

```bash
yarn modular add card-view --path packages/examples --template=card-view
yarn build card-view

yarn modular add grid-view --path packages/examples --template=grid-view
yarn build grid-view
```

Start the demo server and host:

```bash
yarn && yarn serve
```
