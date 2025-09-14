import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import ApodList from "./pages/ApodList/ApodList";
import ApodDetail from "./pages/ApodDetail/ApodDetail";
import Favourites from "./pages/Favourites/Favourites";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
const root = document.getElementById("root");

createRoot(root!).render(
  <HashRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/discover" element={<ApodList />} />
      <Route path="/detail" element={<ApodDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
  </HashRouter>
);
