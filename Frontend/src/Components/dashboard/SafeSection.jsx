import React from "react";
import { AlertCircle } from "lucide-react";

class SafeSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, info) {
    console.error("Section crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-3xl border border-red-500/30 bg-red-500/5 p-6 text-center">
          <AlertCircle className="mx-auto h-6 w-6 text-red-400" />

          <p className="mt-2 text-sm font-bold text-red-200">
            This section failed to load
          </p>

          <p className="mt-1 text-xs text-red-300/70">
            {this.state.error?.message || "Unknown error"}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SafeSection;