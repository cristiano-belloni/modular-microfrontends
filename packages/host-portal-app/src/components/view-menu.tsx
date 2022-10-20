import React from 'react';
import useSwr from 'swr';
import { ButtonBar } from '@jpmorganchase/uitk-lab';
import { Button } from '@jpmorganchase/uitk-core';

interface ViewMenuProps {
  launch(baseUrl: string): void;

  url: string;
}

export function ViewMenu({ url, launch }: ViewMenuProps) {
  const { data = [] } = useSwr(url, url => fetch(url).then(r => r.json()));

  return <ButtonBar alignLeft={true}>
    {data.map(({ name, root }) =>
      <Button
        onClick={() => launch(`${url}${root}`)}>{name}</Button>)}
  </ButtonBar>;
}
