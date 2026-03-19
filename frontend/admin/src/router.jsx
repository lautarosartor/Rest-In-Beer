import PrivateRoute from "components/PrivateRoutes";
import PrivateClientRoute from "components/PrivateRoutes/client";
import Loading from "components/results/Loading";
import NotFound from "components/results/NotFound";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("./routes/auth/login"));
const DashboardPage = lazy(() => import("./routes/dashboard"));
const MesasPage = lazy(() => import("./routes/mesas"));
const ProductosPage = lazy(() => import("./routes/productos"));
const SesionesPage = lazy(() => import("./routes/sesiones"));
// const PrevSesionPage = lazy(() => import("./routes/sesion/components/PrevSesion"));
// const PrevSesionPage = lazy(() => import("./routes/auth/sesion"));
const IdentifyPage = lazy(() => import("./routes/auth/identify"));
const SesionPage = lazy(() => import("./routes/sesion"));

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route index path="/" element={<DashboardPage />} />
          <Route path="/mesas" element={<MesasPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/sesiones" element={<SesionesPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sesion/auth" element={<IdentifyPage />} />
        <Route path="*" element={<NotFound />} />

        {/* Rutas para la sesion */}
        <Route element={<PrivateClientRoute />}>
          <Route path="/mesa/:qr" element={<SesionPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRouter;