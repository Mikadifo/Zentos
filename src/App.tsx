import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Earnings from "./pages/Earnings";
import Expenses from "./pages/Expenses";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import { TransactionProvider } from "./context/TransactionContext";

function App() {
  return (
    <TransactionProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/earnings/:year" element={<Earnings />} />
            <Route path="/expenses/:year" element={<Expenses />} />
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </TransactionProvider>
  );
}

export default App;
