import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";
import ScreenContent from "./ScreenContent";

function ErrorScreen({ status, message }) {
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
