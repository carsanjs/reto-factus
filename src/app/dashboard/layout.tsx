"use client";

// import { SidebarDesktop } from "../../../components/sidebar/sidebar.desktop";
// import { SidebarMovil } from "../../../components/sidebar/sidebar.movil";
import { PrivatedRoute } from "@/lib/private/route.private";
import { Loading } from "../../../components/ui/Loading";
import { AuthContext, AuthProvider } from "@/lib/context/auth.context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) =>
          !auth.isInitialized ? (
            <Loading />
          ) : (
            <PrivatedRoute>
              <>
                {children}
                {/* Sidebar for desktop */}
                {/* <SidebarDesktop /> */}
                {/* Sidebar for movil */}
                {/* <SidebarMovil>{children}</SidebarMovil> */}
              </>
            </PrivatedRoute>
          )
        }
      </AuthContext.Consumer>
    </AuthProvider>
  );
}
