import { useCallback, useState } from 'react';

export function useArray<T>(initial: T[] = []): [T[], (item: T) => void] {
  const [array, setArray] = useState<T[]>(initial);

  return [
    array,
    useCallback(
      (item: T) => setArray((current) => [...current, item]),
      [setArray],
    ),
  ];
}
