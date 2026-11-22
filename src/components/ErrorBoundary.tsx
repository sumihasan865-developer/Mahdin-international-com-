import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  declare props: Readonly<ErrorBoundaryProps>;
  state: ErrorBoundaryState;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Application render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center space-y-4 shadow-2xl">
            <h1 className="text-xl font-bold text-white">
              Mahdin-International Ltd.
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              A temporary display error occurred while loading the page. Please reload to continue.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 text-sm transition-colors cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
