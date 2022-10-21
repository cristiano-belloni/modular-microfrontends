import { useCallback, useState } from 'react';

export function useToggle<A, B>(alpha: A, beta: B) {
  const [value, setValue] = useState<A | B>(alpha);

  return [
    value,
    useCallback((next: A | B | unknown) => setValue(current => {
      if (next === alpha) {
        return beta;
      }
      if (next === beta) {
        return alpha;
      }
      return current === alpha ? beta : alpha;
    }), [setValue]),
  ];
}
