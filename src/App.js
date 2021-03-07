import { Router } from "@reach/router";
import "./App.css";
import TouchWheel from "./TouchWheel";
import Controls from "./Controls";
import Home from "./Home";
import Music from "./Music";

function App() {
  return (
    <div className="ipod">
      <Router>
        <Home path="/" />
        <Music path="/music" />
      </Router>
      <Controls />
      <TouchWheel />
    </div>
  );
}

export default App;
