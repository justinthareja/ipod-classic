import { useCallback } from "react";
import { useSkipToNext } from "./useSkipToNext";
import { useNextClick } from "./useNextClick";

export function useNextControl() {
  const { mutate: skipToNext } = useSkipToNext();
  const nextHandler = useCallback(() => {
    skipToNext();
  }, [skipToNext]);

  useNextClick(nextHandler);
}
