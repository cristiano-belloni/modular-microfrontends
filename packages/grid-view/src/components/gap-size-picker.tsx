import React from 'react';

import { FormField } from '@jpmorganchase/uitk-core';

interface GapSizePickerParams {
  onChange(gapSize: number): void;

  value: number
}

export function GapSizePicker({ onChange, value }: GapSizePickerParams) {
  const sizes: number[] = Array.from({ length: 5 }, (_, gap) => gap + 1);

  return <FormField>
    <select
      onChange={e => onChange(parseInt(e.target.selectedOptions[0].text, 10))}>
      {sizes.map(size => <option key={size}
                                 selected={value === size}>{size}</option>)}
    </select>
  </FormField>;
}
