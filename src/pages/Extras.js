import MenuScreen from "../components/MenuScreen";

function Extras(props) {
  return (
    <MenuScreen
      header="Extras"
      menuItems={[
        { name: "Clock", path: "/clock" },
        { name: "Contacts", path: "/contacts" },
        { name: "Calendar", path: "/calendar" },
        { name: "Notes", path: "/notes" },
        { name: "Games", path: "/games" },
      ]}
    />
  );
}

export default Extras;
