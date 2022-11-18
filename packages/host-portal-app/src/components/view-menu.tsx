import React from 'react';
import useSwr from 'swr';
import { ButtonBar } from '@jpmorganchase/uitk-lab';
import { Button } from '@jpmorganchase/uitk-core';

interface ViewMenuProps {
  launch(baseUrl: string): void;
  url: string;
}

interface CatalogDatum {
  name: string;
  root: string;
  manifest: string;
}

export function ViewMenu({ url, launch }: ViewMenuProps): JSX.Element {
  const { data = [] } = useSwr<CatalogDatum[]>(url, (url) =>
    fetch(url).then((r) => r.json()),
  );

  const baseUrl = new URL(url, window.location.origin).origin;

  return (
    <ButtonBar alignLeft={true}>
      {data.length ? (
        data.map(({ name, root }) => (
          <Button onClick={() => launch(`${baseUrl}${root}`)}>{name}</Button>
        ))
      ) : (
        <p>⚠️ Catalog is empty!</p>
      )}
    </ButtonBar>
  );
}
