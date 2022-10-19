import React, { useState } from 'react';
import {
  BorderItem,
  BorderLayout,
  Card,
  FlexLayout,
  ToolkitProvider,
} from '@jpmorganchase/uitk-core';

import {
  AvatarSizePicker,
  AvatarSizeProvider,
  GapSizePicker,
  PersonGrid,
  ThemePicker,
} from './components';
import { AvatarSize, Person, Theme } from './types';
import { person } from './util/person';

import '@jpmorganchase/uitk-theme/index.css';

const data: Person[] = [
  person('Steve', 'King', 'x'),
  person('Cristiano', 'Belloni'),
  person('Benjamin', 'Pryke'),
  person('Ayse', 'Enver'),
  person('Alberto', 'Brusa'),
  person('Josh', 'Wooding-Olajorin'),
  person('Zhihao', 'Cui'),
  person('Alina', 'Visan'),
  person('Thomas', 'Saunders'),
  person('David', 'Miller'),
  person('Liberty', 'Curtis'),
  person('Immanuel', 'Baskaran'),
  person('Joana', 'Moreira', 'm'),
  person('Fernanda', 'Castillo Gomez', 'g'),
  person('Eleanor', 'Haproff'),
  person('Rustam', 'Arazov'),
  person('Simon', 'Arbuckle'),
  person('Zarko', 'Penar'),
  person('Neil', 'Slinger'),
];


export default function EsmView(): JSX.Element {
  const [theme, setTheme] = useState<Theme>('light');
  const [avatarSize, setAvatarSize] = useState<AvatarSize>('medium');
  const [gapSize, setGapSize] = useState<number>(2);

  return (
    <ToolkitProvider theme={theme} density={'medium'}>
      <AvatarSizeProvider value={avatarSize}>
        <Card>
          <BorderLayout gap={gapSize}>
            <BorderItem position={'header'}>
              <FlexLayout gap={gapSize}>
                <ThemePicker onChange={setTheme} value={theme} />
                <AvatarSizePicker value={avatarSize} onChange={setAvatarSize} />
                <GapSizePicker value={gapSize} onChange={setGapSize} />
              </FlexLayout>
            </BorderItem>
            <BorderItem position={'main'}>
              <PersonGrid data={data} avatarSize={avatarSize} />
            </BorderItem>
          </BorderLayout>
        </Card>
      </AvatarSizeProvider>
    </ToolkitProvider>
  );
}
