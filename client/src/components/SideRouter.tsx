import {
  IconCreditCard,
  // IconCurrencyCent,
  IconHistory,
  IconHome,
  IconUser,
} from "@tabler/icons-react";
import { DesktopSidebar, SidebarLink, SidebarProvider } from "./Sidebar";
import { Link } from "react-router-dom";

const SideRouter = () => {
  return (
    <>
      <div className="flex h-screen">
        <SidebarProvider>
          <DesktopSidebar>
            <div>
              <p className="bg-gradient-to-r from-white to-gray-950 bg-clip-text font-palanquin text-3xl font-extrabold text-transparent dark:from-white dark:to-black">
                <Link to="/">Cashew</Link>
              </p>
            </div>
            <nav className="mt-10 space-y-6">
              <SidebarLink
                link={{
                  label: "Dashboard",
                  href: "/dashboard",
                  icon: <IconHome size={30} />,
                }}
              />
              <SidebarLink
                link={{
                  label: "Transfer Fund",
                  href: "/transfer",
                  icon: <IconCreditCard size={30} />,
                }}
              />
              <SidebarLink
                link={{
                  label: "User Profile",
                  href: "/profile",
                  icon: <IconUser size={30} />,
                }}
              />
              <SidebarLink
                link={{
                  label: "Transaction History",
                  href: "/history",
                  icon: <IconHistory size={30} />,
                }}
              />
            </nav>
          </DesktopSidebar>
        </SidebarProvider>
      </div>
    </>
  );
};
export default SideRouter;
