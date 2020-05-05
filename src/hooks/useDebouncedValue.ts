import { useEffect, useState } from 'react';

export default function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [delay, value]);

  return debouncedValue;
}
