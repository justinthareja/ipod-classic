import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { TouchWheelProvider } from "./TouchWheelContext";
import { ControlsProvider } from "./ControlsContext";

const queryClient = new QueryClient();

function AppProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <TouchWheelProvider>
            <ControlsProvider>{children}</ControlsProvider>
          </TouchWheelProvider>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default AppProvider;
