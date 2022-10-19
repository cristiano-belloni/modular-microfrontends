import React from 'react';

import {
  FlexItem,
  FlexLayout,
  ToolkitProvider,
} from '@jpmorganchase/uitk-core';

import { RemoteView, RemoteViews, ViewMenu } from './components';
import { useArray } from './util';

import '@jpmorganchase/uitk-theme/index.css';
import styles from './index.module.css';

export default function () {
  const [remoteViews, pushRemoteView] = useArray<string>();

  return (
    <ToolkitProvider theme={'light'} density={'low'}>
      <RemoteViews>
        <ViewMenu url='http://localhost:5000' launch={pushRemoteView} />

        <FlexLayout gap={1} wrap>
          {remoteViews.map((v, key) =>
            <FlexItem key={key} grow={1} className={styles.viewItem}>
              <RemoteView baseUrl={v} />
            </FlexItem>,
          )}
        </FlexLayout>
      </RemoteViews>
    </ToolkitProvider>
  );
}
