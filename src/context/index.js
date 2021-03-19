import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./AuthContext";
import { TouchWheelProvider } from "../TouchWheel";
import { ControlsProvider } from "../Controls";

const queryClient = new QueryClient();

function AppProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TouchWheelProvider>
          <ControlsProvider>{children}</ControlsProvider>
        </TouchWheelProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default AppProvider;
