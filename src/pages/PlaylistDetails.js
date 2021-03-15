import MenuScreen from "../components/MenuScreen";
import details from "../stubs/playlistDetails.json";

function PlaylistDetails(props) {
  console.log(details);
  return (
    <MenuScreen
      header={details.name}
      menuItems={details.tracks.items.map((item) => ({
        name: item.track.name,
      }))}
    />
  );
}

export default PlaylistDetails;
