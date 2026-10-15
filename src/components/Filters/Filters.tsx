import "./Filters.css";
import { useState, useEffect } from "react";
import {
  FaSearch,
  FaRandom,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaSlidersH,
} from "react-icons/fa";
import { useTranslation } from "../../i18n";

type FiltersProps = {
  onRandom: () => void;
  onFiltered: (year: number, month: number) => void;
  loading?: boolean;
  activeMode?: "filtered" | "random";
  initialYear?: number;
  initialMonth?: number;
};

export default function Filters({
  onRandom,
  onFiltered,
  loading = false,
  activeMode = "filtered",
  initialYear = 2023,
  initialMonth = 6,
}: FiltersProps) {
  const [mode, setMode] = useState<"date" | "random">(
    activeMode === "random" ? "random" : "date"
  );
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const { t } = useTranslation();

  useEffect(() => {
    setMode(activeMode === "random" ? "random" : "date");
  }, [activeMode]);

  useEffect(() => {
    if (initialYear) setYear(initialYear);
  }, [initialYear]);

  useEffect(() => {
    if (initialMonth) setMonth(initialMonth);
  }, [initialMonth]);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const handleYearChange = (newYear: number) => {
    const clampedYear = Math.max(1996, Math.min(newYear, currentYear));
    setYear(clampedYear);
    if (clampedYear >= currentYear && month > currentMonth) {
      setMonth(currentMonth);
    }
  };

  const handleMonthSelect = (selectedMonth: number) => {
    if (year >= currentYear && selectedMonth > currentMonth) return;
    setMonth(selectedMonth);
  };

  // Porcentaje del slider para colorear la barra de progreso activa
  const sliderMin = 1996;
  const sliderProgress = ((year - sliderMin) / (currentYear - sliderMin)) * 100;

  return (
    <div className="filters-sidebar glass-panel">
      <div className="filters-header">
        <FaSlidersH className="filters-icon" />
        <h2>{t("components.filters.title")}</h2>
      </div>

      {/* Tabs de modo: Por Fecha o Aleatorio */}
      <div className="filters-mode-tabs">
        <button
          type="button"
          className={`mode-tab ${mode === "date" ? "active" : ""}`}
          onClick={() => setMode("date")}
          disabled={loading}
        >
          <FaCalendarAlt className="tab-icon" /> {t("components.filters.filter")}
        </button>
        <button
          type="button"
          className={`mode-tab ${mode === "random" ? "active" : ""}`}
          onClick={() => {
            setMode("random");
            onRandom();
          }}
          disabled={loading}
        >
          <FaRandom className="tab-icon" /> {t("components.filters.random")}
        </button>
      </div>

      {mode === "date" ? (
        <div className="filters-body">
          {/* Selector de Año con Stepper y Slider */}
          <div className="filter-group">
            <div className="filter-label-row">
              <span className="filter-label">{t("components.filters.year")}</span>
              <div className="year-stepper">
                <button
                  type="button"
                  className="btn-stepper"
                  onClick={() => handleYearChange(year - 1)}
                  disabled={year <= 1996 || loading}
                  aria-label="Año anterior"
                >
                  <FaChevronLeft />
                </button>
                <span className="filter-value year-badge">{year}</span>
                <button
                  type="button"
                  className="btn-stepper"
                  onClick={() => handleYearChange(year + 1)}
                  disabled={year >= currentYear || loading}
                  aria-label="Año siguiente"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>

            <div className="slider-container">
              <input
                className="filter-slider"
                type="range"
                min={1996}
                max={currentYear}
                value={year}
                style={{
                  background: `linear-gradient(to right, var(--accent-primary) 0%, var(--accent-primary) ${sliderProgress}%, var(--bg-tertiary) ${sliderProgress}%, var(--bg-tertiary) 100%)`,
                }}
                onChange={(e) => handleYearChange(Number(e.target.value))}
                disabled={loading}
              />
              <div className="slider-ticks">
                <span>1996</span>
                <span>{currentYear}</span>
              </div>
            </div>
          </div>

          {/* Selector de Mes con Grid 3x4 de Pills */}
          <div className="filter-group">
            <div className="filter-label-row">
              <span className="filter-label">{t("components.filters.month")}</span>
              <span className="filter-value month-name">
                {t(`common.months.${month}` as any)}
              </span>
            </div>

            <div className="months-grid">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
                const isSelected = month === m;
                const isDisabled = year >= currentYear && m > currentMonth;
                const monthFullName = t(`common.months.${m}` as any);
                const shortName = monthFullName.slice(0, 3);

                return (
                  <button
                    key={m}
                    type="button"
                    className={`month-chip ${isSelected ? "selected" : ""} ${
                      isDisabled ? "disabled" : ""
                    }`}
                    onClick={() => handleMonthSelect(m)}
                    disabled={isDisabled || loading}
                    title={monthFullName}
                  >
                    {shortName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Botón de búsqueda */}
          <button
            type="button"
            className="btn-filter btn-search"
            onClick={() => onFiltered(year, month)}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="spin-icon" /> {t("components.filters.search")}...
              </>
            ) : (
              <>
                <FaSearch /> {t("components.filters.search")}
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="filters-body random-body">
          <p className="random-description">
            Descubre fotografías y videos cósmicos seleccionados aleatoriamente entre los más de 10.000 días del archivo oficial de la NASA.
          </p>
          <button
            type="button"
            className="btn-filter btn-random-action"
            onClick={onRandom}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="spin-icon" /> Explorando...
              </>
            ) : (
              <>
                <FaRandom /> Generar Nuevos
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
