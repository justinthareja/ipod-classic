import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUser } from "../context/UserContext";
import spotifyApi from "../api/spotifyApi";
import { useNoop } from "../utils/helpers";
import { useState } from "react";

function usePause() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const player = queryClient.getQueryData("player");
  const [isEnabled, setIsEnabled] = useState(false);

  const mutation = useMutation(() => spotifyApi.pause(), {
    onMutate: async () => {
      await queryClient.cancelQueries("player");

      const previousPlayer = queryClient.getQueryData("player");

      queryClient.setQueryData("player", (old) => {
        const newPlayer = cloneDeep(old);
        set(newPlayer, "body.is_playing", false);
        return newPlayer;
      });

      return { previousPlayer };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData("player", context.previousPlayer);
    },
    onSettled: () => {
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
      if (data.body.is_playing) {
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

  const noop = useNoop();
  const unAuthorizedMutation = { isSuccess: true, mutate: noop };
  const authorizedMutation = {
    ...mutation,
    mutate:
      player && player.statusCode === 200 && player.body.is_playing
        ? mutation.mutate
        : noop,
  };
  return user ? authorizedMutation : unAuthorizedMutation;
}

export { usePause };
