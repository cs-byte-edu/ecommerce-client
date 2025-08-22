import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";

export const LayoutTwoColumns = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <aside>
        <Sidebar />
      </aside>
    </div>
  );
};
