import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useUser } from "../context/UserContext";
import spotifyApi from "../api/spotifyApi";
import { useNoop } from "../utils/helpers";

function usePlay() {
  const { user } = useUser();
  const [isEnabled, setIsEnabled] = useState(false);

  const mutation = useMutation((options) => spotifyApi.play(options), {
    onSuccess: () => {
      setIsEnabled(true);
    },
  });

  // eslint-disable-next-line no-unused-vars
  const playerQuery = useQuery(
    "player",
    async () => {
      const data = await spotifyApi.getMyCurrentPlaybackState();

      // Sometimes spotify returns without an item
      // this will trigger react-query's retry behavior
      if (data.statusCode === 200 && !data.body.item) {
        throw new Error("Current playback state responded with invalid item");
      }

      // when refetching the playback state immediately after playing a song,
      // sometimes the playback state will return with the old playing status
      if (!data.body.is_playing) {
        throw new Error("Current playback state still reflects previous track");
      }

      return data;
    },
    {
      enabled: !!user && isEnabled,
      onSettled: () => {
        setIsEnabled(false);
      },
    }
  );

  const fakeMutate = useNoop();

  return user
    ? mutation
    : { isSuccess: true, mutate: fakeMutate, data: { statusCode: 204 } };
}

export { usePlay };
