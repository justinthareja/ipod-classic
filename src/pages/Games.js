import MenuScreen from "../components/MenuScreen";

function Games(props) {
  return (
    <MenuScreen
      header="Games"
      menuItems={[
        { name: "Brick", path: "/Brick" },
        { name: "Music Quiz", path: "/music-quiz" },
        { name: "Parachute", path: "/parachute" },
        { name: "Solataire", path: "/solataire" },
      ]}
    />
  );
}

export default Games;
