import { Routes, Route, Navigate, BrowserRouter } from "react-router";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Home from "@/pages/Home/Home";
import ApodList from "@/pages/ApodList/ApodList";
import ApodDetail from "@/pages/ApodDetail/ApodDetail";
import Contact from "@/pages/Contact/Contact";
import Favourites from "@/pages/Favourites/Favourites";
import History from "@/pages/History/History";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/discover" element={<ApodList />} />
          <Route path="/detail" element={<ApodDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
