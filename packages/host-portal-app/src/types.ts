import * as React from 'react';

export type AppRegView = {
  name: string;
  root: string;
  manifest: string;
};

export interface Manifest {
  name: string;
  module: string;
  style?: string;
  styleImports?: string[];
  modular?: { type?: 'app' | 'esm-view' };
}

export interface View {
  default: React.ComponentType;
}
