import { ReactNode } from "react";
import SideNavbar from "./SideNavbar";
import { ThemeProvider } from "./ThemeProvider";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const { children } = props;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex flex-row">
        <SideNavbar />
        <main>{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
