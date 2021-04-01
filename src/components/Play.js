import get from "lodash/get";
import { useEffect } from "react";
import { usePlay } from "../hooks/usePlay";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

function Play({ playOptions, onPlaySuccess }) {
  const { isError, error, mutate, isSuccess } = usePlay();

  useEffect(() => {
    mutate(playOptions);
  }, [playOptions]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isSuccess) {
      onPlaySuccess();
    }
  }, [onPlaySuccess, isSuccess]);

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
