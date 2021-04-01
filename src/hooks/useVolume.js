import { useMutation, useQueryClient } from "react-query";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import spotifyApi from "../api/spotifyApi";
import { useUser } from "../context/UserContext";
import { useNoop } from "../utils/helpers";

function useVolume() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const mutation = useMutation((volume) => spotifyApi.setVolume(volume), {
    // When mutate is called
    onMutate: async (newVolume) => {
      // cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries("player");

      // snapshot the previous value
      const previousPlayer = queryClient.getQueryData("player");

      // optimistically update to the new value
      queryClient.setQueryData("player", (old) => {
        const newPlayer = cloneDeep(old);
        set(newPlayer, "body.device.volume_percent", newVolume);
        return newPlayer;
      });

      // return a context object with the snapshotted value
      return { previousPlayer };
    },
    // if the mutation fails, use the context returned from onMutate to roll back the update
    onError: (err, newVolume, context) => {
      queryClient.setQueryData("player", context.previousPlayer);
    },
    // always refetch after error or success
    onSettled: () => {
      // queryClient.invalidateQueries("player");
    },
  });

  const fakeMutate = useNoop();
  const fakeMutation = {
    mutate: fakeMutate,
  };

  return user ? mutation : fakeMutation;
}

export { useVolume };
