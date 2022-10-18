import React, { useState } from 'react';
import {
  BorderItem,
  BorderLayout, Card,
  FlexLayout,
  ToolkitProvider,
} from '@jpmorganchase/uitk-core';

import {
  AvatarSizePicker,
  GapSizePicker,
  PersonGrid,
  ThemePicker,
} from './components';
import { AvatarSize, Person, Theme } from './types';
import md5 from './util/md5';

import '@jpmorganchase/uitk-theme/index.css';
import './EsmView.css';

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

function person(first_name: string, last_name: string, token = ''): Person {
  const username = `${first_name}${token && `.${token}`}.${last_name}`
    .replace(/\s/g, '')
    .toLowerCase();
  const email = `${username}@jpmorgan.com`;

  return {
    first_name,
    last_name,
    avatar: `https://gravatar.com/avatar/${md5(email)}?d=identicon`,
    email,
    username,
  };
}

export default function EsmView(): JSX.Element {
  const [theme, setTheme] = useState<Theme>('dark');
  const [avatarSize, setAvatarSize] = useState<AvatarSize>('small');
  const [gapSize, setGapSize] = useState<number>(2);

  return (
    <ToolkitProvider theme={theme} density={'medium'}>
      <Card className='EsmView'>
        <BorderLayout gap={gapSize} style={{ height: '100vh' }}>
          <BorderItem position={'header'}>
            <FlexLayout gap={gapSize}>
              <ThemePicker onChange={setTheme} value={theme} />
              <AvatarSizePicker value={avatarSize} onChange={setAvatarSize} />
              <GapSizePicker value={gapSize} onChange={setGapSize} />
            </FlexLayout>
          </BorderItem>
          <BorderItem position={'main'} style={{ overflow: 'auto' }}>
            <PersonGrid data={data} avatarSize={avatarSize} />
          </BorderItem>
        </BorderLayout>
      </Card>
    </ToolkitProvider>
  );
}


