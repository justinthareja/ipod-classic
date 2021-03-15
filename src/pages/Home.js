import MenuScreen from "../components/MenuScreen";

function Home(props) {
  return (
    <MenuScreen
      header="iPod"
      menuItems={[
        { name: "Music", path: "/music" },
        { name: "Extras", path: "/extras" },
        { name: "Settings", path: "/settings" },
        { name: "Shuffle Songs" },
        { name: "Backlight" },
        { name: "Now Playing", path: "/now-playing" },
      ]}
    />
  );
}

export default Home;
