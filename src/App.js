import "./App.css";
import TouchWheel from "./TouchWheel";
import Controls from "./Controls";
import Screen from "./Screen";

function App() {
  function handleTick({ direction }) {
    console.log("tick", direction);
  }

  return (
    <div className="ipod">
      <Screen />
      <Controls />
      <TouchWheel onTick={handleTick} />
    </div>
  );
}

export default App;
