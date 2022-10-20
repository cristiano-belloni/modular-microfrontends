import React, { useEffect, useState } from 'react';

import { Card, ToolkitProvider } from '@jpmorganchase/uitk-core';

import { Profile } from './components';
import { Person } from './types';
import { PERSON, person } from './util/person';

import '@jpmorganchase/uitk-theme/index.css';

const steve: Person = person('Steve', 'King', 'x');

export default function EsmView(): JSX.Element {
  const person  = usePerson();

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
    const listener = function (e) {
      if (e.data?.broadcast !== 'person') {
        return;
      }
      setPerson(e.data.person || PERSON);
    };

    window.addEventListener('message', listener);

    return () => window.removeEventListener('message', listener);
  }, [setPerson])

  return person;
}
