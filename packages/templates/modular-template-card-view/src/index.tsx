import React, { useEffect, useState } from 'react';

import { Card, ToolkitProvider } from '@jpmorganchase/uitk-core';

import { Profile } from './components';
import { PERSON } from './util/person';

import '@jpmorganchase/uitk-theme/index.css';

import type { Person } from './types';

export default function EsmView(): JSX.Element {
  const person = usePerson();

  return (
    <ToolkitProvider>
      <Card>
        <Profile person={person} />
      </Card>
    </ToolkitProvider>
  );
}

function usePerson() {
  const [person, setPerson] = useState(PERSON);

  useEffect(() => {
    const bc = new BroadcastChannel('person_channel');
    bc.onmessage = (e: MessageEvent<Person>) => {
      setPerson(e.data);
    };
    return () => bc.close();
  }, []);

  return person;
}
