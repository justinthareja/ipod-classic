import { useEffect } from "react";
import { usePlay } from "../hooks/usePlay";

function Play({ trackId, children }) {
  const { isError, isSuccess, mutate } = usePlay();

  useEffect(() => {
    mutate && mutate(trackId);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (isSuccess) {
    return children;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }

  return <h1>Loading...</h1>;
}

export default Play;
