import React, { useCallback, useEffect, useRef } from 'react';

import { Grid, GridColumn } from '@jpmorganchase/uitk-grid';
import { Avatar } from '@jpmorganchase/uitk-lab';

import { Person } from '../types';

import styles from './person-grid.module.css';

type PersonGridComponent = (props: { data: Person[] }) => JSX.Element;

export const PersonGrid: PersonGridComponent = ({ data }) => {
  const style = {};

  const bc = useRef(new BroadcastChannel('person_channel')).current;

  useEffect(() => () => bc.close(), [bc]);

  const handleRowSelected = useCallback(
    ([selected]: number[]) => {
      const person = (typeof selected === 'number' && data[selected]) || null;
      bc.postMessage(person);
    },
    [bc, data],
  );

  return (
    <Grid
      rowData={data}
      rowKeyGetter={(row) => row.avatar}
      className={styles.personDataGrid}
      style={style}
      onRowSelected={handleRowSelected}
      rowSelectionMode={'single'}
      zebra
    >
      <GridColumn
        name={''}
        id={'avatar'}
        getValue={(p) => p.avatar}
        cellValueComponent={AvatarCell}
        defaultWidth={50}
      />
      <GridColumn<Person>
        name={'First Name'}
        id={'first_name'}
        getValue={(p) => p.first_name}
        defaultWidth={150}
      />
      <GridColumn<Person>
        name={'Username'}
        id={'username'}
        getValue={(p) => p.username}
        defaultWidth={250}
      />
    </Grid>
  );
};

function AvatarCell({
  row: {
    data: { avatar },
  },
}: {
  row: { data: Person };
}) {
  const size = 'medium';
  return <Avatar src={avatar} size={size} />;
}
