import { useCallback, useState } from 'react';

export function useToggle<A, B>(
  alpha: A,
  beta: B,
): [A | B, (next?: A | B) => void] {
  const [value, setValue] = useState<A | B>(alpha);

  return [
    value,
    useCallback(
      (next?: A | B) =>
        setValue((current) => {
          if (next === alpha) {
            return beta;
          }
          if (next === beta) {
            return alpha;
          }
          return current === alpha ? beta : alpha;
        }),
      [setValue, alpha, beta],
    ),
  ];
}
