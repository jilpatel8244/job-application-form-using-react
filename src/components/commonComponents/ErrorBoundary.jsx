import React from "react";
import ErrorPopup from "./ErrorPopup";

class ErrorBoundary extends React.Component {
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
    this.setState({
      hasError: false,
      error: null
    })
  }

  render() {
    if (this.state.hasError) {
      console.log("here");
      return (
        <ErrorPopup error={this.state.error} onClose={this.onClose.bind(this)}/>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
