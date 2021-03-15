import MenuScreen from "../components/MenuScreen";

function Home(props) {
  return (
    <MenuScreen
      header="iPod"
      menuItems={[
        { name: "Music", path: "/music" },
        { name: "Extras", path: "/extras" },
        { name: "Voice Memos", path: "/voice-memos" },
        { name: "Shuffle Songs" },
        { name: "Backlight" },
      ]}
    />
  );
}

export default Home;
