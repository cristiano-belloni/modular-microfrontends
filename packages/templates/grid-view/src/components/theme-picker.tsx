import React from 'react';

import { FormField } from '@jpmorganchase/uitk-core';
import { AvatarSize, Theme } from '../types';

interface ThemePickerParams {
  onChange(value: Theme): void;

  value: Theme;
}

export function ThemePicker({ onChange, value }: ThemePickerParams) {
  const options: Theme[] = ['dark', 'light'];

  return <FormField>
    <select
      onChange={e => onChange(e.target.selectedOptions[0].text as Theme)}>
      {options.map(option => <option key={option}
                                     selected={value === option}>{option}</option>)}
    </select>
  </FormField>;
}


