import React from 'react';

import { ToggleButton } from '@jpmorganchase/uitk-lab';

export function ThemePicker({theme, toggleTheme}) {
  const checked = theme === 'dark';

  return <ToggleButton disableTooltip onToggle={toggleTheme}>
    {!checked ? '🔆' : '🌑'} {theme}
  </ToggleButton>
}
