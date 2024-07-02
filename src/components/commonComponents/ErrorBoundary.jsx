import React, { lazy } from "react";
import { FormContext } from "../../context/FormContext";
const ErrorPopup = lazy(() => import('./ErrorPopup'));

class ErrorBoundary extends React.Component {
  static contextType = FormContext;

constructor(props) {
  super(props);
  this.state = { hasError: false, error: null };
}

componentDidCatch(error, errorInfo) {
  this.setState({
    hasError: true,
    error: error
  })
}

onClose = () => {
  this.context.setIsPopupOpen(false);
  this.setState({
    hasError: false,
    error: null
  })
}

render() {
  if (this.state.hasError) {
    return (
      <ErrorPopup error={this.state.error} onClose={this.onClose.bind(this)} />
    )
  }

  return this.props.children;
}
}

export default ErrorBoundary;
