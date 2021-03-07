import { useState } from 'react';
import "./App.css";
import TouchWheel from "./TouchWheel";
import Controls from "./Controls";
import Screen from "./Screen";
import tickSrc from './assets/tick.m4a'

function App() {
  const tick = new Audio(tickSrc);
  const [screenProps, setScreenProps] = useState({
    type: "menu",
    header: "iPod",
    statusIcon: null,
    selectedIndex: 0,
    menuItems: [
      { name: "Music", hasSubMenu: true },
      { name: "Extras", hasSubMenu: true },
      { name: "Voice Memos", hasSubMenu: true },
      { name: "Shuffle Songs", hasSubMenu: false },
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

  function handleClick() {
    const { selectedIndex, menuItems } = screenProps;
    console.log("clicked", menuItems[selectedIndex].name);
  }

  return (
    <div className="ipod">
      <Screen {...screenProps}/>
      <Controls />
      <TouchWheel onTick={handleTick} onClick={handleClick} />
    </div>
  );
}

export default App;
