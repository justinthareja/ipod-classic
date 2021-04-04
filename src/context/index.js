import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default AppProvider;
