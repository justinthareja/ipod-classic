import { useEffect } from "react";
import { usePlay } from "../hooks/usePlay";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

function Play({ trackId, children }) {
  const { isError, isSuccess, error, mutate } = usePlay();

  useEffect(() => {
    mutate &&
      mutate({
        uris: [`spotify:track:${trackId}`],
      });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (isSuccess) {
    return children;
  }

  if (isError) {
    return (
      <ErrorScreen
        status={error.body.error.status}
        message={error.body.error.message}
      />
    );
  }

  return <LoadingScreen />;
}

export default Play;
