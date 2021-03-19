import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";

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
