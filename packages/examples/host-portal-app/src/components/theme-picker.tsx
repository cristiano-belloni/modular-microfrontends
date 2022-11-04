import React from 'react';

import { ToggleButton } from '@jpmorganchase/uitk-lab';

export function ThemePicker({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}): JSX.Element {
  const checked = theme === 'dark';

  return (
    <ToggleButton disableTooltip onToggle={toggleTheme}>
      {!checked ? '🔆' : '🌑'} {theme}
    </ToggleButton>
  );
}
