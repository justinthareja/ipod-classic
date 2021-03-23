import { useEffect } from "react";
import { usePlay } from "../hooks/usePlay";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

function Play({ trackId, children }) {
  const { isError, error, mutate, data, isLoading } = usePlay();

  useEffect(() => {
    mutate &&
      mutate({
        uris: [`spotify:track:${trackId}`],
      });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (isError) {
    return (
      <ErrorScreen
        status={error.body.error.status}
        message={error.body.error.message}
      />
    );
  }

  if (isLoading || !(data && data.statusCode && data.statusCode === 204)) {
    return <LoadingScreen />;
  }

  return children;
}

export default Play;
