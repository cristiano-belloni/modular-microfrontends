import React, { useState } from 'react';

import { Card, ToolkitProvider } from '@jpmorganchase/uitk-core';

import { Profile } from './components';
import { Person } from './types';
import { PERSON, person } from './util/person';

import '@jpmorganchase/uitk-theme/index.css';
import './EsmView.css';

const steve: Person = person('Steve', 'King', 'x');

export default function EsmView(): JSX.Element {
  const [person, togglePerson] = useToggle(PERSON, steve);

  return (
    <ToolkitProvider>
      <Card onClick={togglePerson}>
        <Profile person={person} />
      </Card>
    </ToolkitProvider>
  );
}

function useToggle<T>(first: T, second: T) {
  const [state, setState] = useState(first);
  return [
    state,
    () => setState(current => current === first ? second : first),
  ];
}
