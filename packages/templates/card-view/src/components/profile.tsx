import React from 'react';

import { GridItem, GridLayout, StackLayout } from '@jpmorganchase/uitk-core';
import { Avatar } from '@jpmorganchase/uitk-lab';

import { Person } from '../types';

import styles from './profile.module.css';

export function Profile({ person }: { person: Person }) {
  return <GridLayout className={styles.profileCard} gap={1}>
    <GridItem>
      <Avatar size={'large'} src={person.avatar} />
    </GridItem>
    <GridItem>
      <StackLayout gap={1}>
        <label>Name</label>
        <div>{person.first_name}{' '}{person.last_name}</div>
        <label>Username</label>
        <div>{person.username}</div>
        <ProfileEmail person={person} />
      </StackLayout>
    </GridItem>
  </GridLayout>;
}

function ProfileEmail({ person: { email } }: { person: Person }) {
  if (!email) {
    return null;
  }

  return <>
    <label>Email</label>
    <a href={`mailto:${email}`}>{email}</a>
  </>;
}
