import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { OfflineBanner } from "./OfflineBanner";
import { UpdatePrompt } from "./UpdatePrompt";

export function Layout() {
  return (
    <>
      <NavBar />
      <OfflineBanner />
      <UpdatePrompt />
      <Outlet />
    </>
  );
}
