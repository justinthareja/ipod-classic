import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { TouchWheelProvider } from "./TouchWheelContext";
import { ControlsProvider } from "./ControlsContext";
import { StatusProvider } from "./StatusContext";

const queryClient = new QueryClient();

function AppProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <StatusProvider>
            <TouchWheelProvider>
              <ControlsProvider>{children}</ControlsProvider>
            </TouchWheelProvider>
          </StatusProvider>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default AppProvider;
