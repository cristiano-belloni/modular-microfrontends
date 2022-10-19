import React, { createContext, PropsWithChildren, useContext } from 'react';

import { FormField } from '@jpmorganchase/uitk-core';
import { AvatarSize } from '../types';

interface AvatarSizePickerParams {
  onChange(avatarSize: AvatarSize): void;

  value: AvatarSize;
}

export function AvatarSizePicker({ onChange, value }: AvatarSizePickerParams) {
  const sizes: AvatarSize[] = ['small', 'medium', 'large'];

  return <FormField>
    <select
      onChange={e => onChange(e.target.selectedOptions[0].text as AvatarSize)}>
      {sizes.map(size => <option key={size}
                                 selected={value === size}>{size}</option>)}
    </select>
  </FormField>;
}

const avatarSizeContext = createContext<AvatarSize>('medium');

export const AvatarSizeProvider = avatarSizeContext.Provider;

export function useAvatarSize() {
  return useContext(avatarSizeContext);
}

