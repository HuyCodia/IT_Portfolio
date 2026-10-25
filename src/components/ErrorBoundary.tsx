import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Produktionssicherer Error-Boundary: Fängt unerwartete Laufzeitfehler in Subbäumen ab,
 * verhindert einen kompletten White-Screen-Absturz und bietet eine saubere Fallback-UI.
 */
export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In Produktion: An Monitoring-Service (z. B. Sentry) weiterleiten
    console.error('ErrorBoundary gefangen:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      if (this.fallback) {
        return this.fallback;
      }

      return (
        <section className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-[var(--surface-color)] text-[var(--text-color)] border border-[var(--border-color)] rounded-xl m-6">
          <div className="w-14 h-14 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-4">
            <i className="fa-solid fa-triangle-exclamation text-2xl" />
          </div>
          <h2 className="text-2xl font-bold mb-2 font-heading">
            Ein unerwarteter Fehler ist aufgetreten
          </h2>
          <p className="text-[var(--text-muted)] max-w-md mb-6 text-sm">
            Die Komponente konnte nicht geladen werden. Bitte lade die Seite neu.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn btn-sm border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-[#0B0F14] transition-colors"
          >
            Seite neu laden
          </button>
        </section>
      );
    }

    return this.props.children;
  }

  private get fallback(): ReactNode {
    return this.props.fallback;
  }
}

