import { useQuery } from "react-query";
import LoadingScreen from "./LoadingScreen";

function LoadComponent({ query, renderSuccess, renderError }) {
  const { isLoading, isError, data, error } = useQuery(query);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return renderError(error);
  }

  return renderSuccess(data);
}

export default LoadComponent;
