import "./Filters.css";
import { useState } from "react";
import { FaSearch, FaRandom, FaCalendarAlt } from "react-icons/fa";

type FiltersProps = {
  onRandom: () => void;
  onFiltered: (year: number, month: number) => void;
};

export default function Filters({ onRandom, onFiltered }: FiltersProps) {
  const [year, setStart] = useState(2023);
  const [month, setEnd] = useState(6);

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return (
    <div className="filters-sidebar glass-panel">
      <div className="filters-header">
        <FaCalendarAlt className="filters-icon" />
        <h2>Explorar Archivo</h2>
      </div>

      <div className="filters-body">
        <div className="filter-group">
          <div className="filter-label-row">
            <span className="filter-label">Año</span>
            <span className="filter-value">{year}</span>
          </div>
          <input
            className="filter-slider"
            type="range"
            min={1996}
            max={new Date().getFullYear()}
            value={year}
            onChange={(e) => setStart(Number(e.target.value))}
          />
        </div>

        <div className="filter-group">
          <div className="filter-label-row">
            <span className="filter-label">Mes</span>
            <span className="filter-value">{monthNames[month - 1]}</span>
          </div>
          <input
            className="filter-slider"
            type="range"
            min={1}
            max={12}
            value={month}
            onChange={(e) => setEnd(Number(e.target.value))}
          />
        </div>

        <button
          className="btn-filter btn-search"
          onClick={() => onFiltered(year, month)}
        >
          <FaSearch /> Buscar
        </button>
      </div>

      <div className="filters-divider">
        <span>O</span>
      </div>

      <div className="filters-body">
        <button className="btn-filter btn-random" onClick={onRandom}>
          <FaRandom /> Descubrimiento Aleatorio
        </button>
      </div>
    </div>
  );
}
