import spotifyApi from "../api/spotifyApi";
import { useMutation } from "react-query";

export function useShuffle() {
  const mutation = useMutation((boolean) => spotifyApi.setShuffle(boolean));
  return mutation;
}
