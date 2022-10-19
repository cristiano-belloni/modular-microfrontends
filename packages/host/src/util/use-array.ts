import { useState } from 'react';

export function useArray<T>(initial: T[] = []) {
  const [array, setArray] = useState<T[]>(initial);

  return [
    array,
    (item: T) => setArray(current => [...current, item]),
  ]
}
