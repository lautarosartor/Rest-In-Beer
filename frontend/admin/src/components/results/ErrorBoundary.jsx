import { Typography } from 'antd';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <Typography.Title
            style={{ color: 'red' }}
          >
            💥 Algo se rompió
          </Typography.Title>

          <Typography.Text type="secondary">
            Hacé bien
          </Typography.Text>
          <pre style={{ color: 'crimson' }}>
            {this.state.error?.toString()}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;