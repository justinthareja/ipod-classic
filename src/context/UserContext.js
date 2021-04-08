import { createContext, useContext, useEffect } from "react";
import get from "lodash/get";
import { useAuth } from "./AuthContext";
import { useMyDevices, useMe } from "../hooks";
import { toast } from "react-toastify";

const UserContext = createContext();

function UserProvider(props) {
  const { token, logout } = useAuth();
  const { data: user, ...userQuery } = useMe({ enabled: !!token });
  const { data: devices, ...devicesQuery } = useMyDevices({
    enabled: !!token,
  });

  useEffect(() => {
    const userError = get(userQuery, "error.body.error.status");
    const devicesError = get(devicesQuery, "error.body.error.status");

    if (userError === 401 || devicesError === 401) {
      logout();
    }
  }, [userQuery, devicesQuery, logout]);

  useEffect(() => {
    if (userQuery.isSuccess && devicesQuery.isSuccess) {
      toast.success("Successfully logged in");
    }
  }, [userQuery.isSuccess, devicesQuery.isSuccess]);

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
