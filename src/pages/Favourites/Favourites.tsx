import "./Favourites.css";
import FavouriteEntry from "../../components/FavouriteEntry/FavouriteEntry";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import type { Apod } from "../../models/Apod";

import { useNavigate } from "react-router";

export default () => {
  const apods = readApods();
  const navigate = useNavigate();

  function goToApodDetails(apod: Apod) {
    navigate("/detail", { state: apod });
  }

  return (
    <>
      <Header></Header>
      <div className="main">
        <div className="favourites-container">
          <h1 className="favourites-title">Apods Guardados</h1>
          <div className="favourites-entries">
            {apods.map((apod) => (
              <FavouriteEntry
                key={apod.date + apod.title}
                goToApodDetails={goToApodDetails}
                apod={apod}
                addFavourite={addFavourite}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

function readApods(): Apod[] {
  const apods: Apod[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    const item = localStorage.getItem(key);
    if (!item) continue;

    const parsed: Apod = JSON.parse(item);
    apods.push(parsed);
  }

  return apods;
}

function addFavourite(apod: Apod) {
  const apodKey = apod.date + apod.title;

  if (localStorage.getItem(apodKey)) {
    localStorage.removeItem(apodKey);
    return;
  }

  localStorage.setItem(apodKey, JSON.stringify(apod));
}
