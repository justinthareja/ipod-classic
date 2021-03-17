import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";

function NotFound(props) {
  return (
    <Screen>
      <ScreenHeader header="404" />
      <div className="not-found">
        <p>Page Not Found</p>
      </div>
    </Screen>
  );
}

export default NotFound;
