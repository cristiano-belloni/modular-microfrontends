# Micro-Front End Portal

## Getting Started

Load dependencies and start up the application catalogue server and build the
host view.

```bash
yarn && yarn serve
```

## Create an Application

### Example apps

```bash
yarn modular add card-view --template=card-view
yarn build card-view

yarn modular add grid-view --template=grid-view
yarn build grid-view

yarn modular add simple-app --template=iframe-app
PUBLIC_URL="/simple-app" yarn build simple-app
```

Note: apps or esm-views that are loaded as iframes need to be built with a base
url because the server won't serve them from root. In general, using the
environment variable `PUBLIC_URL="/<package-name>"` when building will work.
