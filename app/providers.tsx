import { ReactNode } from "react";
import { ThemeProvider } from "./_context/useTheme";

const Providers = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;
