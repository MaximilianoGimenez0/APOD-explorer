import "./Filters.css";
import { useState } from "react";

type FiltersProps = {
  onRandom: () => void;
  onFiltered: (year: number, month: number) => void;
};

export default function Filters({ onRandom, onFiltered }: FiltersProps) {
  const [year, setStart] = useState(1996);
  const [month, setEnd] = useState(6);

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div className="filters-container">
      <div className="range-search">
        <h2>DESCUBRÍ</h2>

        <div className="input-container">
          <label className="filter-label" htmlFor="start">
            {year}
          </label>
          <input
            className="filter-input"
            type="range"
            id="start"
            min={1996}
            max={2025}
            value={year}
            onChange={(e) => setStart(Number(e.target.value))}
          />
        </div>

        <div className="input-container">
          <label className="filter-label" htmlFor="end">
            {monthNames[month - 1]}
          </label>
          <input
            className="filter-input"
            type="range"
            id="end"
            min={1}
            max={12}
            value={month}
            onChange={(e) => setEnd(Number(e.target.value))}
          />
        </div>

        <button
          className="custom-button search-button"
          onClick={() => onFiltered(year, month)}
        >
          Buscar
        </button>
      </div>

      <hr className="separador" />

      <div className="random-search">
        <button className="custom-button search-button" onClick={onRandom}>
          Random
        </button>
      </div>
    </div>
  );
}
