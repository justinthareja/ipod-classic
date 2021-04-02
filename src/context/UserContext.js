import { createContext, useContext } from "react";
import get from "lodash/get";
import { useAuth } from "./AuthContext";
import { useMyDevices, useMe } from "../hooks";

const UserContext = createContext();

function UserProvider(props) {
  const { token } = useAuth();
  const { data: user, ...userQuery } = useMe({ enabled: !!token });
  const { data: devices, ...devicesQuery } = useMyDevices({
    enabled: !!token,
  });

  if (devicesQuery.isLoading || userQuery.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (userQuery.isError) {
    return <h1>{JSON.stringify(userQuery.error, null, 2)}</h1>;
  }

  if (devicesQuery.isError) {
    return <h1>{JSON.stringify(userQuery.error, null, 2)}</h1>;
  }

  return (
    <UserContext.Provider
      value={{
        user: get(user, "body"),
        devices: get(devices, "body.devices") || [],
      }}
      {...props}
    />
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser() must be used within <UserProvider>");
  }
  return context;
}

export { UserProvider, useUser };
