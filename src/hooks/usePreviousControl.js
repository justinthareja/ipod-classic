import { useCallback } from "react";
import { useSkipToPrevious } from "./useSkipToPrevious";
import { usePreviousClick } from "./usePreviousClick";

export function usePreviousControl() {
  const { mutate: skipToPrevious } = useSkipToPrevious();
  const previousHandler = useCallback(() => {
    skipToPrevious();
  }, [skipToPrevious]);

  usePreviousClick(previousHandler);
}
