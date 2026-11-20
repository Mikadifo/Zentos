import logo from "./../../assets/logo.svg";
import icon from "./../../assets/icon.svg";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { BiCalendar, BiLogOut } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { FaBalanceScale } from "react-icons/fa";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import {
  useState,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from "react";
import { GrList } from "react-icons/gr";

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ isSidebarOpen, setSidebarOpen }: SidebarProps) {
  const [year, setYear] = useState(new Date().getFullYear());

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleYearSubmit = (
    event: KeyboardEvent<HTMLInputElement>,
    baseURL: string,
  ) => {
    if (event.key === "Enter") {
      navigate(`${baseURL}/${year}`);
    }
  };

  return (
    <aside
      className={`bg-zento-white ${isSidebarOpen ? "w-58 px-8" : "w-12 px-2"} py-8 flex flex-col fixed left-0 h-full justify-between`}
    >
      <div className="flex flex-col gap-8">
        <img src={isSidebarOpen ? logo : icon} alt="Logo" />
        <div className="h-px w-full bg-zento-blue rounded-full opacity-25" />

        <nav className="text-zento-white text-base">
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="/dash"
                className={`rounded-xl ${isSidebarOpen ? "py-2 px-4" : "p-2"}  font-bold flex gap-2.5 items-center ${location.pathname.includes("/dash") ? "bg-zento-blue" : "bg-zento-blue-64"} hover:opacity-80`}
              >
                <MdDashboard />
                {isSidebarOpen && "Dashboard"}
              </a>

              <ul
                className="flex flex-col gap-2 text-sm mt-4"
                hidden={!location.pathname.includes("/dash")}
              >
                <li className="self-end">
                  <a
                    href={`/dash/balances/${new Date().getFullYear()}`}
                    className={`rounded-xl ${isSidebarOpen ? "py-2 px-4" : "p-2"} font-bold flex gap-2.5 items-center w-fit ${location.pathname.includes("balances") ? "bg-zento-blue" : "bg-zento-blue-64 "} hover:opacity-80`}
                  >
                    <FaBalanceScale />
                    {isSidebarOpen && "Balances"}
                  </a>

                  {isSidebarOpen && location.pathname.includes("balances") && (
                    <div className="rounded-xl bg-zento-blue py-2 px-4 font-bold flex gap-2.5 items-center w-fit hover:opacity-80 ml-auto mt-4">
                      <BiCalendar />
                      <input
                        type="number"
                        className="w-10 outline-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={year}
                        onChange={({ target }) => setYear(Number(target.value))}
                        onKeyDown={(evt) => handleYearSubmit(evt, "/balances")}
                      />
                    </div>
                  )}
                </li>
              </ul>
            </li>
            <li>
              <a
                href={`/earnings/${new Date().getFullYear()}`}
                className={`rounded-xl ${isSidebarOpen ? "py-2 px-4" : "p-2"} font-bold flex gap-2.5 items-center ${location.pathname.includes("earnings") ? "bg-zento-blue" : "bg-zento-blue-64"} hover:opacity-80`}
              >
                <FaMoneyBill1Wave />
                {isSidebarOpen && "Earnings"}
              </a>
              {isSidebarOpen && location.pathname.includes("earnings") && (
                <div className="rounded-xl bg-zento-blue py-2 px-4 font-bold flex gap-2.5 items-center w-fit hover:opacity-80 ml-auto mt-4">
                  <BiCalendar />
                  <input
                    type="number"
                    className="w-10 outline-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={year}
                    onChange={({ target }) => setYear(Number(target.value))}
                    onKeyDown={(evt) => handleYearSubmit(evt, "/earnings")}
                  />
                </div>
              )}
            </li>
            <li>
              <a
                href={`/expenses/${new Date().getFullYear()}`}
                className={`rounded-xl ${isSidebarOpen ? "py-2 px-4" : "p-2"} font-bold flex gap-2.5 items-center ${location.pathname.includes("expenses") ? "bg-zento-blue" : "bg-zento-blue-64"} hover:opacity-80`}
              >
                <GiPayMoney />
                {isSidebarOpen && "Expenses"}
              </a>

              {isSidebarOpen && location.pathname.includes("expenses") && (
                <div className="rounded-xl bg-zento-blue py-2 px-4 font-bold flex gap-2.5 items-center w-fit hover:opacity-80 ml-auto mt-4">
                  <BiCalendar />
                  <input
                    type="number"
                    className="w-10 outline-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={year}
                    onChange={({ target }) => setYear(Number(target.value))}
                    onKeyDown={(evt) => handleYearSubmit(evt, "/balances")}
                  />
                </div>
              )}
            </li>

            <li>
              <a
                href="/categories"
                className={`rounded-xl ${isSidebarOpen ? "py-2 px-4" : "p-2"} font-bold flex gap-2.5 items-center ${location.pathname.includes("categories") ? "bg-zento-blue" : "bg-zento-blue-64"} hover:opacity-80`}
              >
                <GrList />
                {isSidebarOpen && "Categories"}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="button"
          className={`rounded-xl border border-zento-blue flex gap-2.5 justify-center items-center text-zento-blue cursor-pointer ${isSidebarOpen ? "py-2 px-4" : "p-2"} font-bold hover:opacity-80`}
          onClick={handleLogout}
        >
          <BiLogOut />
          {isSidebarOpen && "Logout"}
        </button>

        <div className="h-px w-full bg-zento-blue rounded-full opacity-25" />

        <button
          className="flex gap-2 items-center justify-center cursor-pointer hover:opacity-80"
          onClick={() => {
            localStorage.setItem("sidebarOpen", String(!isSidebarOpen));
            setSidebarOpen((prev) => !prev);
          }}
        >
          {isSidebarOpen ? (
            <>
              <TbLayoutSidebarLeftCollapseFilled />
              Collapse
            </>
          ) : (
            <TbLayoutSidebarRightCollapseFilled />
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
