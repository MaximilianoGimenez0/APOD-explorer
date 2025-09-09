import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import ApodList from "./pages/ApodList/ApodList";
import ApodDetail from "./pages/ApodDetail/ApodDetail";
import Favourites from "./pages/Favourites/Favourites";

const root = document.getElementById("root");

createRoot(root!).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<ApodList />} />
      <Route path="/detail" element={<ApodDetail />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
  </HashRouter>
);
