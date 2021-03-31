import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useUser } from "../context/UserContext";
import spotifyApi from "../api/spotifyApi";
import { useNoop } from "../utils/helpers";

function useSkipToNext() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isEnabled, setIsEnabled] = useState(false);

  const mutation = useMutation(() => spotifyApi.skipToNext(), {
    onSuccess: () => {
      setIsEnabled(true);
    },
  });

  // eslint-disable-next-line no-unused-vars
  const playerQuery = useQuery(
    "player",
    async () => {
      const previousData = queryClient.getQueryData("player");
      const data = await spotifyApi.getMyCurrentPlaybackState();

      // Sometimes spotify returns without an item
      // this will trigger react-query's retry behavior
      if (data.statusCode === 200 && !data.body.item) {
        throw new Error("Current playback state responded with invalid item");
      }

      // when refetching the playback state immediately after going to a next song,
      // sometimes the playback state will return with the old song
      // in this case trigger retry
      if (data.body.item.id === previousData.body.item.id) {
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

export { useSkipToNext };
