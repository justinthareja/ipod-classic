import { useEffect } from "react";
import { usePlay } from "../hooks/usePlay";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

function Play({ trackId, onPlaySuccess }) {
  const { isError, error, mutate, data = {}, isLoading, isSuccess } = usePlay();

  useEffect(() => {
    mutate({
      uris: [`spotify:track:${trackId}`],
    });
  }, [trackId]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isSuccess && data.statusCode === 204) {
      onPlaySuccess();
    }
  }, [onPlaySuccess, data.statusCode, isSuccess]);

  if (isError) {
    return (
      <ErrorScreen
        status={error.body.error.status}
        message={error.body.error.message}
      />
    );
  }

  if (isLoading || data.statusCode !== 204) {
    return <LoadingScreen />;
  }

  return null;
}

export default Play;
