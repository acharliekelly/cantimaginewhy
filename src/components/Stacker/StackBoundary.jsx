import React from 'react';

/**
 * Error boundary
 */
class StackBoundary extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  componentDidCatch (error, info) {
    this.setState({
      hasError: true
    })
    console.log('Something broke in Stacker: ', error, info)
  }

  render () {
    if (this.props.hasError) {
      return <h1 className="error">Something is broken!</h1>
    }
    return this.props.children;
  }
}

export default StackBoundary;