import NotFound from "components/results/NotFound";
import { Route, Routes } from "react-router-dom";
import Dashboard from "routes/dashboard";
import MainLayout from "./layouts/main";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/usuarios" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;