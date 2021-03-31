import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";
import ScreenContent from "./ScreenContent";

function ErrorScreen({ status = "500", message = "Something went wrong." }) {
  return (
    <Screen>
      <ScreenHeader header={status} />
      <ScreenContent className="center">
        <p>{message}</p>
      </ScreenContent>
    </Screen>
  );
}

export default ErrorScreen;
