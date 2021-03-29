import { useCallback } from "react";

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return `${minutes}:${seconds}`;
}

function noop() {}

function useNoop() {
  return useCallback(noop, []);
}

export { formatTime, useNoop };
