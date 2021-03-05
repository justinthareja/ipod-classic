import './App.css';
import TouchWheel from './TouchWheel';
import Controls from './Controls';
import Screen from './Screen';

function App() {
  return (
    <div className="ipod">
      <Screen />
      <Controls />
      <TouchWheel />
    </div>
  );
}

export default App;
