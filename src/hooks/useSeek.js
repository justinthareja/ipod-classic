import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import spotifyApi from "../api/spotifyApi";
import { useMutation, useQueryClient } from "react-query";
import { useNoop } from "../utils/helpers";
import { useUser } from "../context/UserContext";

export function useSeek() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const mutation = useMutation((postition) => spotifyApi.seek(postition), {
    onMutate: async (newPosition) => {
      await queryClient.cancelQueries("player");

      const previousPlayer = queryClient.getQueryData("player");

      queryClient.setQueryData("player", (old) => {
        const newPlayer = cloneDeep(old);
        set(newPlayer, "body.progress_ms", newPosition);
        return newPlayer;
      });

      return { previousPlayer };
    },
    onError: (err, newPosition, context) => {
      queryClient.setQueryData("player", context.previousPlayer);
    },
    onSettled: () => {
      // queryClient.invalidateQueries("player");
    },
  });
  const noop = useNoop();

  return user ? mutation : { mutate: noop };
}
