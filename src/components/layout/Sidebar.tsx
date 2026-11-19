import logo from "./../../assets/logo.svg";
import icon from "./../../assets/icon.svg";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { getAvailableYears } from "../../utils/transactionsYears";
import { BiCalendar, BiLogOut } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useTransactions } from "../../context/TransactionContext";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { FaBalanceScale } from "react-icons/fa";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import { type Dispatch, type SetStateAction } from "react";
import { GrList } from "react-icons/gr";

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ isSidebarOpen, setSidebarOpen }: SidebarProps) {
  const { transactions } = useTransactions();

  const earnings = transactions.filter(({ type }) => type === "income");
  const expenses = transactions.filter(({ type }) => type === "expense");
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
                  {isSidebarOpen && (
                    <ul
                      className="flex flex-col gap-2 text-sm mt-4"
                      hidden={!location.pathname.includes("balances")}
                    >
                      {getAvailableYears(earnings).map((year) => (
                        <li key={year} className="self-end">
                          <a
                            href={`/dash/balances/${year}`}
                            className="rounded-xl bg-zento-blue py-2 px-4 font-bold flex gap-2.5 items-center w-fit hover:opacity-80"
                          >
                            <BiCalendar />
                            {year}
                          </a>
                        </li>
                      ))}
                    </ul>
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
              {isSidebarOpen && (
                <ul
                  className="flex flex-col gap-2 text-sm mt-4"
                  hidden={!location.pathname.includes("earnings")}
                >
                  {getAvailableYears(earnings, "income").map((year) => (
                    <li key={year} className="self-end">
                      <a
                        href={`/earnings/${year}`}
                        className="rounded-xl bg-zento-blue py-2 px-4 font-bold flex gap-2.5 items-center w-fit hover:opacity-80"
                      >
                        <BiCalendar />
                        {year}
                      </a>
                    </li>
                  ))}
                </ul>
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

              {isSidebarOpen && (
                <ul
                  className="flex flex-col gap-2 text-sm mt-4"
                  hidden={!location.pathname.includes("expenses")}
                >
                  {getAvailableYears(expenses, "expense").map((year) => (
                    <li key={year} className="self-end">
                      <a
                        href={`/expenses/${year}`}
                        className="rounded-xl bg-zento-blue py-2 px-4 font-bold flex gap-2.5 items-center w-fit hover:opacity-80"
                      >
                        <BiCalendar />
                        {year}
                      </a>
                    </li>
                  ))}
                </ul>
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
            localStorage.setItem("sidebarOpen", JSON.stringify(!isSidebarOpen));
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
