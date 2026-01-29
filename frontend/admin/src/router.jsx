import PrivateRoute from "components/PrivateRoutes";
import NotFound from "components/results/NotFound";
import { Route, Routes } from "react-router-dom";
import Login from "routes/auth/Login";
import Dashboard from "routes/dashboard";

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/usuarios" element={<Dashboard />} />
        <Route path="/usuarios" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default AppRouter;