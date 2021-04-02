import get from "lodash/get";
import { useEffect } from "react";
import { usePlay } from "../hooks/usePlay";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

function Play({ playOptions, onPlaySuccess }) {
  const { isError, error, mutate, isSuccess, isOffline } = usePlay();

  useEffect(() => {
    mutate(playOptions);
  }, [playOptions, mutate]);

  useEffect(() => {
    if (isSuccess || isOffline) {
      onPlaySuccess();
    }
  }, [onPlaySuccess, isSuccess, isOffline]);

  if (isError) {
    return (
      <ErrorScreen
        status={get(error, "body.error.status")}
        message={get(error, "body.error.message")}
      />
    );
  }

  return <LoadingScreen />;
}

export default Play;
