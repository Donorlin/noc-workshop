import { AppShell, AppShellBrand, AppShellNav } from "@donorlin/noc-ui";
import { Link, NavLink, Outlet, ScrollRestoration } from "react-router";
import { features } from "@/features";

const navigation = features.flatMap((feature) => (feature.navigation ? [feature.navigation] : []));

export function RootLayout() {
  return (
    <AppShell
      appName="Organizer"
      brand={
        <Link to="/" aria-label="Organizer home">
          <AppShellBrand appName="Organizer" />
        </Link>
      }
      navigation={
        <AppShellNav>
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
        </AppShellNav>
      }
    >
      <Outlet />
      <ScrollRestoration />
    </AppShell>
  );
}
