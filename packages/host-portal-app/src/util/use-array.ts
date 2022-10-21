import { useCallback, useState } from 'react';

export function useArray<T>(initial: T[] = []) {
  const [array, setArray] = useState<T[]>(initial);

  return [
    array,
    useCallback((item: T) => setArray(current => [...current, item]), [setArray]),
  ]
}
