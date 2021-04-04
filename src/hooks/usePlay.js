import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useUser } from "../context/UserContext";
import spotifyApi from "../api/spotifyApi";
import { useNoop } from "../utils/helpers";

function usePlay() {
  const { user, devices } = useUser();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const mutation = useMutation(
    async (options) => {
      let err;
      try {
        // Try to play using the device already playing
        await spotifyApi.play(options);
      } catch (e) {
        err = e;
      }

      if (err) {
        if (
          err.body.error.status === 404 &&
          err.body.error.reason === "NO_ACTIVE_DEVICE" &&
          devices.length > 0
        ) {
          // Try to start playing on the first device available
          // TODO: make a "devices available" selector
          const deviceId = devices[0].id;
          return spotifyApi.play({
            ...options,
            device_id: deviceId,
          });
        } else {
          throw err;
        }
      }
    },
    {
      onMutate: () => {
        setIsLoading(true);
        setIsSuccess(false);
      },
      onSuccess: () => {
        setIsEnabled(true);
      },
      onError: (error) => {
        setIsError(true);
        setError(error);
        setIsLoading(false);
      },
    }
  );

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
      onSuccess: () => {
        setIsEnabled(false);
        setIsSuccess(true);
      },
      onSettled: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        setIsError(error);
        setError(error);
      },
    }
  );

  const noop = useNoop();
  const authorizedMutation = {
    isOffline: true,
    isSuccess: false,
    data: { statusCode: 204 },
    mutate: noop,
  };

  const unauthorizedMutation = {
    ...mutation,
    isSuccess,
    isLoading,
    isError,
    error,
  };

  return user ? unauthorizedMutation : authorizedMutation;
}

export { usePlay };
