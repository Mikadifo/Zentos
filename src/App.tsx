import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Earnings from "./pages/Earnings";
import Expenses from "./pages/Expenses";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import { TransactionProvider } from "./context/TransactionContext";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Balances from "./pages/Balances";
import Categories from "./pages/Categories";
import { CategoryProvider } from "./context/CategoryContext";
import EarningsDescription from "./pages/EarningsDescription";
import ExpensesDescription from "./pages/ExpensesDescription";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route
              element={
                <CategoryProvider>
                  <TransactionProvider>
                    <AppLayout />
                  </TransactionProvider>
                </CategoryProvider>
              }
            >
              <Route path="/" element={<Navigate to={"/dash"} replace />} />
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/dash/balances/:year" element={<Balances />} />
              <Route
                path="/earnings/:year/:month"
                element={<EarningsDescription />}
              />
              <Route
                path="/expenses/:year/:month"
                element={<ExpensesDescription />}
              />
              <Route path="/earnings/:year" element={<Earnings />} />
              <Route path="/expenses/:year" element={<Expenses />} />
              <Route path="/categories" element={<Categories />} />
            </Route>
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
