import { Outlet } from "react-router";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import "./MainLayout.css";

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
