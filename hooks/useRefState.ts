import React, { useCallback, useState } from 'react';

export function useRefState<T>(
  initialState: T
): [T, (data: ((d: T) => T) | T) => void, { current: T }] {
  const [state, _setState] = useState<T>(initialState);
  const stateRef = React.useRef<T>(state);
  const setState = useCallback((data: T | ((prevState: T) => T)) => {
    if (data instanceof Function) {
      const newState = data(stateRef.current);
      stateRef.current = newState;
      _setState(newState);
    } else {
      stateRef.current = data;
      _setState(data);
    }
  }, []);

  return [state, setState, stateRef];
}
