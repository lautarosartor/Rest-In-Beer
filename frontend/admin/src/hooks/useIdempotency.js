import { useRef } from "react";
import { ulid } from "ulid";

const useIdempotency = () => {
  const keyRef = useRef(null);

  const getKey = () => {
    if (!keyRef.current) {
      keyRef.current = ulid();
    }
    return keyRef.current;
  };

  const resetKey = () => {
    keyRef.current = null;
  };

  return {
    getKey,
    resetKey,
  };
};

export default useIdempotency;