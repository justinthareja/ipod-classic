import { useQuery } from "react-query";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

function LoadComponent({ Component, query }) {
  const { isLoading, isError, data, error } = useQuery(query);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    const { status, message } = error.body.error;
    return <ErrorScreen status={status} message={message} />;
  }

  return <Component result={data.body} />;
}

export default LoadComponent;
