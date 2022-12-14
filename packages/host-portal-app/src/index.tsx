import React from 'react';

import {
  FlexItem,
  FlexLayout,
  Panel,
  ToolkitProvider,
} from '@jpmorganchase/uitk-core';

import { RemoteView, RemoteViews, ThemePicker, ViewMenu } from './components';
import { useArray, useToggle } from './util';

import '@jpmorganchase/uitk-theme/index.css';
import styles from './index.module.css';
import './portal.css';
import { H3 } from '@jpmorganchase/uitk-lab';

const registryUrl =
  process.env.REACT_APP_REGISTY_URL || 'http://localhost:7777';

export default function Host(): JSX.Element {
  const [remoteViews, pushRemoteView] = useArray<string>();
  const [theme, toggleTheme] = useToggle('light', 'dark');

  return (
    <ToolkitProvider theme={theme} density={'low'}>
      <Panel className={styles.app}>
        <RemoteViews>
          <FlexLayout separators align={'center'}>
            <H3 style={{ whiteSpace: 'nowrap' }}>Micro FrontEnd Portal</H3>
            <ViewMenu url={registryUrl} launch={pushRemoteView} />
            <ThemePicker theme={theme} toggleTheme={toggleTheme} />
          </FlexLayout>
          <FlexLayout gap={1} wrap>
            {remoteViews.map((v, key) => (
              <FlexItem key={key} grow={1} className={styles.viewItem}>
                <RemoteView baseUrl={v} />
              </FlexItem>
            ))}
          </FlexLayout>
        </RemoteViews>
      </Panel>
    </ToolkitProvider>
  );
}
