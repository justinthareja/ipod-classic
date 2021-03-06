import { useState } from 'react';
import "./App.css";
import TouchWheel from "./TouchWheel";
import Controls from "./Controls";
import Screen from "./Screen";
import tickSrc from './tick.m4a'

function App() {
  const tick = new Audio(tickSrc);
  const [screenProps, setScreenProps] = useState({
    type: "menu",
    header: "iPod",
    statusIcon: null,
    selectedIndex: 0,
    menuItems: [
      { name: "Playlists", hasSubMenu: true },
      { name: "Browse", hasSubMenu: true },
      { name: "Extras", hasSubMenu: true },
      { name: "Settings", hasSubMenu: true },
      { name: "Backlight", hasSubMenu: false },
    ],
  });

  function handleTick({ direction }) {
    const { selectedIndex, menuItems } = screenProps;
    if (direction === "clockwise" && selectedIndex < menuItems.length - 1) {
      setScreenProps({ ...screenProps, selectedIndex: selectedIndex + 1});
    }
    
    if (direction === "anticlockwise" && selectedIndex > 0) {
      setScreenProps({ ...screenProps, selectedIndex: selectedIndex - 1 });
    }

    tick.play();
  }

  return (
    <div className="ipod">
      <Screen {...screenProps}/>
      <Controls />
      <TouchWheel onTick={handleTick} />
    </div>
  );
}

export default App;
