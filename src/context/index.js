import { AuthProvider } from "./AuthContext";
import { TouchWheelProvider } from "../TouchWheel";
import { ControlsProvider } from "../Controls";

function AppProvider({ children }) {
  return (
    <AuthProvider>
      <TouchWheelProvider>
        <ControlsProvider>{children}</ControlsProvider>
      </TouchWheelProvider>
    </AuthProvider>
  );
}

export default AppProvider;
