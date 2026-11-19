import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

function AppLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(
    localStorage.getItem("sidebarOpen")
      ? JSON.parse(localStorage.getItem("sidebarOpen"))
      : false,
  );

  return (
    <div className="min-h-screen flex">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`w-full ${isSidebarOpen ? "ms-58" : "ms-12"}`}>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
