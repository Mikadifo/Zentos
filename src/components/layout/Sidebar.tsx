import logo from "./../../assets/logo.svg";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";

function Sidebar() {
  return (
    <aside className="bg-zento-white w-58 p-8 flex flex-col gap-8 fixed left-0 h-full">
      <img src={logo} alt="Logo" />
      <div className="h-px w-full bg-zento-blue rounded-full opacity-25" />

      <nav className="text-zento-white text-base">
        <ul className="flex flex-col gap-4">
          <li>
            <a
              href="/"
              className="rounded-xl bg-zento-blue py-2 px-4 font-bold flex gap-2.5 items-center"
            >
              <MdDashboard />
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/earnings"
              className="rounded-xl bg-zento-blue py-2 px-4 font-bold flex gap-2.5 items-center"
            >
              <FaMoneyBill1Wave />
              Earnings
            </a>
          </li>
          <li>
            <a
              href="/expenses"
              className="rounded-xl bg-zento-blue py-2 px-4 font-bold flex gap-2.5 items-center"
            >
              <GiPayMoney />
              Expenses
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
