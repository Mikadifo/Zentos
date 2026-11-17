import logo from "./../../assets/logo.svg";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { getAvailableYears } from "../../utils/transactionsYears";
import { BiCalendar } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { useTransactions } from "../../context/TransactionContext";

function Sidebar() {
  const { transactions } = useTransactions();
  const earnings = transactions.filter(({ type }) => type === "income");
  const expenses = transactions.filter(({ type }) => type === "income");
  const location = useLocation();

  return (
    <aside className="bg-zento-white w-58 p-8 flex flex-col gap-8 fixed left-0 h-full">
      <img src={logo} alt="Logo" />
      <div className="h-px w-full bg-zento-blue rounded-full opacity-25" />

      <nav className="text-zento-white text-base">
        <ul className="flex flex-col gap-4">
          <li>
            <a
              href="/"
              className={`rounded-xl py-2 px-4 font-bold flex gap-2.5 items-center ${location.pathname === "/" ? "bg-zento-blue" : "bg-zento-blue-64"}`}
            >
              <MdDashboard />
              Dashboard
            </a>
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
    </aside>
  );
}

export default Sidebar;
