import { useMutation, useQueryClient } from "react-query";
import { useUser } from "../context/UserContext";
import spotifyApi from "../api/spotifyApi";
import { useNoop } from "../utils/helpers";

function useSkipToNext() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const mutation = useMutation((options) => spotifyApi.skipToNext(), {
    onSettled: () => {
      queryClient.invalidateQueries("player");
    },
  });
  const fakeMutate = useNoop();

  return user
    ? mutation
    : { isSuccess: true, mutate: fakeMutate, data: { statusCode: 204 } };
}

export { useSkipToNext };