import ErrorScreen from "../components/ErrorScreen";

function NotFound(props) {
  return <ErrorScreen status="404" message="Page Not Found" />;
}

export default NotFound;
