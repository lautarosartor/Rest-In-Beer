import Footer from "components/Footer";
import Header from "components/Header";
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "views/landing/About";
import Contact from "views/landing/Contact";
import Home from "views/landing/Home";
import Menu from "views/landing/Menu";
import Services from "views/landing/Services";
import Testimonials from "views/landing/Testimonials";
import Chat from "./views/public/Sesion/Chat";

const PrevSesion = lazy(() => import("views/public/sesion/prevsesion"));

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/*"
          element={
            <>
              <Header />
              <main className="flex-grow container mx-auto my-20 space-y-20 md:my-32 md:space-y-32 px-6 md:px-10 xl:px-28">
                <Routes>
                  <Route exact path="/"
                    element={
                      <Suspense fallback={<Loading fullscreen />}>
                        <Home />
                        <About />
                        <Menu />
                        <Services />
                        <Testimonials />
                        <Contact />
                      </Suspense>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />

        {/* Autenticacion */}
        {/* <Route path="/login"
          element={
            <Suspense fallback={<Loading fullscreen />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route path="/register"
          element={
            <Suspense fallback={<Loading fullscreen />}>
              <RegisterPage />
            </Suspense>
          }
        />

        <Route path="/admin/*"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loading fullscreen />}>
                <Routes>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="pedidos"   element={<PedidosPage />} />
                  <Route path="mesas"     element={<MesasPage />} />
                  <Route path="productos" element={<ProductosPage />} />
                  <Route path="sesiones"  element={<SesionesPage />} />
                  <Route path="usuarios"  element={<UsuariosPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </PrivateRoute>
          }
        /> */}

        <Route exath path="/sesion/:qr"
          element={
            <Suspense fallback={<Loading fullscreen />}>
              <PrevSesion />
            </Suspense>
          }
        />

        <Route path="/chat"
          element={
            <Chat />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
