import get from "lodash/get";
import { navigate } from "@reach/router";
import { useMenu } from "../hooks";
import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";
import ScreenContent from "./ScreenContent";

function ErrorScreen({
  status = "Client Error",
  message = "Something went wrong.",
  error = {},
}) {
  // parse spotify api client errors
  const apiError = get(error, "body.error.status");
  const apiMessage = get(error, "body.error.message");

  useMenu(() => {
    navigate(-1);
  });

  if (!apiError || !apiMessage) {
    // parse internal errors from throw new Error("")
    if (error && error.message) {
      message = error.message;
    }
  }

  return (
    <Screen>
      <ScreenHeader header={apiError || status} />
      <ScreenContent className="center">
        <p>{apiMessage || message}</p>
      </ScreenContent>
    </Screen>
  );
}

export default ErrorScreen;
