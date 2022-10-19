import React from 'react';

import { Grid, GridColumn } from '@jpmorganchase/uitk-grid';
import { Avatar } from '@jpmorganchase/uitk-lab';

import { AvatarSize, Person } from '../types';

import styles from './person-grid.module.css';
import { useAvatarSize } from './avatar-size-picker';

type PersonGridComponent = (props: { data: Person[], avatarSize: AvatarSize }) => JSX.Element;


export const PersonGrid: PersonGridComponent = ({ data }) => {
  const style = useAvatarSize() === 'large' && {
    '--grid-row-height': '60px',
  };

  return <Grid
    rowData={data}
    rowKeyGetter={row => row.avatar}
    className={styles.personDataGrid}
    style={style}
  >
    <GridColumn name={''} id={'avatar'} getValue={p => p.avatar}
                cellValueComponent={AvatarCell}
                defaultWidth={50}

    />
    <GridColumn name={'First Name'} id={'first_name'}
                getValue={p => p.first_name}
                defaultWidth={150}
    />
    <GridColumn name={'Email'} id={'email'} getValue={p => p.email}
                defaultWidth={250}
    />
  </Grid>;
};

function AvatarCell({ row: { data: { avatar } } }: { row: { data: Person } }) {
  const size = useAvatarSize();
  return <Avatar src={avatar} size={size} />;
}
