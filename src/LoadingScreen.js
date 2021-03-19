import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";
import ScreenContent from "./ScreenContent";

function LoadingScreen(props) {
  return (
    <Screen>
      <ScreenHeader header="Please Wait" />
      <ScreenContent className="center">
        <p>Loading...</p>
      </ScreenContent>
    </Screen>
  );
}

export default LoadingScreen;
