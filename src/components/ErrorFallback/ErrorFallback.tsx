import React from "react";
import {
  FaClock,
  FaExclamationTriangle,
  FaLock,
  FaRedo,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";
import { useTranslation } from "../../i18n";
import "./ErrorFallback.css";

export interface ErrorFallbackProps {
  title?: string;
  message?: string;
  status?: number;
  isTimeout?: boolean;
  onReload?: () => void;
  onRetry?: () => void;
  reloadLabel?: string;
  retryLabel?: string;
  className?: string;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  title,
  message,
  status,
  isTimeout = false,
  onReload,
  onRetry,
  reloadLabel,
  retryLabel,
  className = "",
}) => {
  const { t } = useTranslation();

  const handleReload = () => {
    if (onReload) {
      onReload();
    } else {
      window.location.reload();
    }
  };

  const is404 = status === 404;
  const is403 = status === 403 || status === 401;

  const displayBadge = isTimeout
    ? t("components.errorFallback.statusTimeout")
    : is404
    ? t("components.errorFallback.statusNotFound")
    : is403
    ? t("components.errorFallback.statusForbidden")
    : status
    ? `HTTP ${status}`
    : t("components.errorFallback.statusError");

  const displayTitle =
    title ||
    (isTimeout
      ? t("components.errorFallback.timeoutTitle")
      : is404
      ? t("components.errorFallback.notFoundTitle")
      : is403
      ? t("components.errorFallback.forbiddenTitle")
      : t("components.errorFallback.defaultTitle"));

  const displayMessage =
    message ||
    (isTimeout
      ? t("components.errorFallback.timeoutMessage")
      : is404
      ? t("components.errorFallback.notFoundMessage")
      : is403
      ? t("components.errorFallback.forbiddenMessage")
      : t("components.errorFallback.defaultMessage"));

  return (
    <div
      className={`error-fallback-wrapper ${
        isTimeout
          ? "is-timeout"
          : is404
          ? "is-not-found"
          : is403
          ? "is-forbidden"
          : "is-generic-error"
      } ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="error-fallback-card">
        <div className="error-glow-halo" aria-hidden="true" />

        <div className="error-icon-container">
          {isTimeout ? (
            <FaClock className="error-icon pulse" />
          ) : is404 ? (
            <FaSearch className="error-icon bounce" />
          ) : is403 ? (
            <FaLock className="error-icon pulse" />
          ) : (
            <FaExclamationTriangle className="error-icon pulse" />
          )}
        </div>

        <div className="error-status-pill">{displayBadge}</div>

        <h2 className="error-title">{displayTitle}</h2>
        <p className="error-message">{displayMessage}</p>
        <p className="error-hint">{t("components.errorFallback.hint")}</p>

        <div className="error-actions-group">
          <button
            type="button"
            className="error-cta-btn primary-cta"
            onClick={handleReload}
            aria-label={reloadLabel || t("components.errorFallback.reloadCta")}
          >
            <FaRedo className="btn-icon spin-on-hover" />
            <span>{reloadLabel || t("components.errorFallback.reloadCta")}</span>
          </button>

          {onRetry && (
            <button
              type="button"
              className="error-cta-btn secondary-cta"
              onClick={onRetry}
              aria-label={retryLabel || t("components.errorFallback.retryCta")}
            >
              <FaSyncAlt className="btn-icon" />
              <span>{retryLabel || t("components.errorFallback.retryCta")}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
