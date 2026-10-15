import { Outlet } from "react-router";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import "./MainLayout.css";

/**
 * MainLayout: Layout principal de la aplicación.
 * Mantiene de forma persistente el Header, Footer y el scroll al inicio en cada navegación,
 * proyectando las vistas hijas mediante Outlet.
 */
export default function MainLayout() {
  return (
    <div className="app-layout">
      <ScrollToTop />
      <Header />
      <main className="app-main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
