import * as React from 'react';

export type AppRegView = {
  name: string;
  root: string;
  manifest: string;
}

export interface Manifest {
  module: string;
  style?: string;
}

export interface View {
  default: React.ComponentType;
}

export type MicroFrontendState = Record<string, React.ComponentType>;
