import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="">
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
