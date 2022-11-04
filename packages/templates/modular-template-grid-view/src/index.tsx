import React from 'react';
import { Card, ToolkitProvider } from '@jpmorganchase/uitk-core';

import { PersonGrid } from './components';
import { Person } from './types';
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
  person('Joana', 'Moreira'),
  person('Fernanda', 'Castillo Gomez'),
  person('Eleanor', 'Haproff'),
  person('Rustam', 'Arazov'),
  person('Simon', 'Arbuckle'),
  person('Zarko', 'Penar'),
  person('Neil', 'Slinger'),
];


export default function EsmView(): JSX.Element {
  return (
    <ToolkitProvider>
      <Card>
        <PersonGrid data={data} />
      </Card>
    </ToolkitProvider>
  );
}
