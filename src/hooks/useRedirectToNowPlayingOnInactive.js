import * as React from "react";
import { useQueryClient } from "react-query";
import { useTimeoutFn } from "react-use";
import { navigate } from "@reach/router";

export function useRedirectToNowPlayingOnInactive() {
  const queryClient = useQueryClient();
  const [inactiveTimeoutMs] = React.useState(1000 * 15);
  const player = queryClient.getQueryData("player");

  const onTimeout = () => {
    if (player && player.body && player.body.is_playing) {
      navigate("/now-playing");
    }
  };

  const [, , reset] = useTimeoutFn(onTimeout, inactiveTimeoutMs);

  React.useEffect(() => {
    reset();
  });
}
