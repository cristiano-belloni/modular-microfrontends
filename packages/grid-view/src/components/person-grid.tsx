import React from 'react';

import { Grid, GridColumn } from '@jpmorganchase/uitk-grid';
import { Avatar } from '@jpmorganchase/uitk-lab';

import { AvatarSize, Person } from '../types';

import styles from './person-grid.module.css'
import classNames from 'classnames';

type PersonGridComponent = (props: { data: Person[], avatarSize: AvatarSize }) => JSX.Element;

const UitkPersonGrid: PersonGridComponent = ({ data }) => {
  return <Grid
    rowData={data}
    rowKeyGetter={row => row.avatar}
    className={styles.personDataGrid}
  >
    <GridColumn name={''} id={'avatar'} getValue={p => p.avatar} />
    <GridColumn name={'First Name'} id={'first_name'}
                getValue={p => p.avatar} />
    <GridColumn name={'Email'} id={'email'} getValue={p => p.avatar} />
  </Grid>;
};


const HtmlPersonGrid: PersonGridComponent = ({
                                                  data,
                                                  avatarSize,
                                                }) => {
  return <table className={classNames(styles.personGrid, styles.personDataGrid)}>
    {data.map(person => (
      <PersonRow key={person.avatar} person={person} size={avatarSize} />))}
  </table>;
};

function PersonRow({
                     person,
                     size = 'small',
                   }: { person: Person, size: AvatarSize }) {
  return <tr>
    <td><Avatar src={person.avatar} size={size} /></td>
    <td><p>{person.first_name}</p></td>
    <td><p>{person.email}</p></td>
  </tr>;
}


export const PersonGrid = UitkPersonGrid;
