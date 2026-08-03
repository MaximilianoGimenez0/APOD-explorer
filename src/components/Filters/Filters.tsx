import "./Filters.css";
import { useState } from "react";
import { FaSearch, FaRandom, FaCalendarAlt } from "react-icons/fa";
import { useTranslation } from "../../i18n";

type FiltersProps = {
  onRandom: () => void;
  onFiltered: (year: number, month: number) => void;
};

export default function Filters({ onRandom, onFiltered }: FiltersProps) {
  const [year, setStart] = useState(2023);
  const [month, setEnd] = useState(6);
  const { t } = useTranslation();

  return (
    <div className="filters-sidebar glass-panel">
      <div className="filters-header">
        <FaCalendarAlt className="filters-icon" />
        <h2>{t('components.filters.title')}</h2>
      </div>

      <div className="filters-body">
        <div className="filter-group">
          <div className="filter-label-row">
            <span className="filter-label">{t('components.filters.year')}</span>
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
            <span className="filter-label">{t('components.filters.month')}</span>
            <span className="filter-value">{t(`common.months.${month}` as any)}</span>
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
          <FaSearch /> {t('components.filters.search')}
        </button>
      </div>

      <div className="filters-divider">
        <span>{t('components.filters.or')}</span>
      </div>

      <div className="filters-body">
        <button className="btn-filter btn-random" onClick={onRandom}>
          <FaRandom /> {t('components.filters.random')}
        </button>
      </div>
    </div>
  );
}
