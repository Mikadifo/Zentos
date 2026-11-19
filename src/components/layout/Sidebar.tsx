import logo from "./../../assets/logo.svg";
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

function Sidebar() {
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
    <aside className="bg-zento-white w-58 p-8 flex flex-col fixed left-0 h-full justify-between">
      <div className="flex flex-col gap-8">
        <img src={logo} alt="Logo" />
        <div className="h-px w-full bg-zento-blue rounded-full opacity-25" />

        <nav className="text-zento-white text-base">
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="/dash"
                className={`rounded-xl py-2 px-4 font-bold flex gap-2.5 items-center ${location.pathname.includes("/dash") ? "bg-zento-blue" : "bg-zento-blue-64"}`}
              >
                <MdDashboard />
                Dashboard
              </a>

              <ul
                className="flex flex-col gap-2 text-sm mt-4"
                hidden={!location.pathname.includes("/dash")}
              >
                <li className="self-end">
                  <a
                    href={`/dash/balances/${new Date().getFullYear()}`}
                    className={`rounded-xl py-2 px-4 font-bold flex gap-2.5 items-center w-fit ${location.pathname.includes("balances") ? "bg-zento-blue" : "bg-zento-blue-64 "}`}
                  >
                    <FaBalanceScale />
                    Balances
                  </a>
                  <ul
                    className="flex flex-col gap-2 text-sm mt-4"
                    hidden={!location.pathname.includes("balances")}
                  >
                    {getAvailableYears(earnings).map((year) => (
                      <li key={year} className="self-end">
                        <a
                          href={`/dash/balances/${year}`}
                          className="rounded-xl bg-zento-blue py-2 px-4 font-bold flex gap-2.5 items-center w-fit"
                        >
                          <BiCalendar />
                          {year}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a
                href={`/earnings/${new Date().getFullYear()}`}
                className={`rounded-xl py-2 px-4 font-bold flex gap-2.5 items-center ${location.pathname.includes("earnings") ? "bg-zento-blue" : "bg-zento-blue-64"}`}
              >
                <FaMoneyBill1Wave />
                Earnings
              </a>
              <ul
                className="flex flex-col gap-2 text-sm mt-4"
                hidden={!location.pathname.includes("earnings")}
              >
                {getAvailableYears(earnings, "income").map((year) => (
                  <li key={year} className="self-end">
                    <a
                      href={`/earnings/${year}`}
                      className="rounded-xl bg-zento-blue py-2 px-4 font-bold flex gap-2.5 items-center w-fit"
                    >
                      <BiCalendar />
                      {year}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a
                href={`/expenses/${new Date().getFullYear()}`}
                className={`rounded-xl py-2 px-4 font-bold flex gap-2.5 items-center ${location.pathname.includes("expenses") ? "bg-zento-blue" : "bg-zento-blue-64"}`}
              >
                <GiPayMoney />
                Expenses
              </a>

              <ul
                className="flex flex-col gap-2 text-sm mt-4"
                hidden={!location.pathname.includes("expenses")}
              >
                {getAvailableYears(expenses, "expense").map((year) => (
                  <li key={year} className="self-end">
                    <a
                      href={`/expenses/${year}`}
                      className="rounded-xl bg-zento-blue py-2 px-4 font-bold flex gap-2.5 items-center w-fit"
                    >
                      <BiCalendar />
                      {year}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      <button
        type="button"
        className="rounded-xl border border-zento-blue flex gap-2.5 justify-center items-center text-zento-blue cursor-pointer py-2 px-4 font-bold"
        onClick={handleLogout}
      >
        <BiLogOut />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
