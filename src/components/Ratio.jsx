import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ratio extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasComputed: false,
            width: 0,
            height: 0
         }
    }

    getComputedDimensions({x, y}) {
        const { width } = this.container.getBoudingClientRect();

        return {
            width,
            height: width * (y / x)
        }
    }

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        this.setState(this.getComputedDimensions(nextProps))
    }

    componentDidMount() {
        this.setState({
            ...this.getComputedDimensions(this.props),
            hasComputed: true
        })

        window.addEventListener('resize', this.handleResize, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize, false);
    }

    handleResize = () => {
        this.setState({
            hasComputed: false
        }, () => {
            this.setState({
                hasComputed: true,
                ...this.getComputedDimensions(this.props)
            })
        })

    }

    render() {
        const { hasComputed, width, height } = this.state;
        return (
            <div ref={(ref) => this.container = ref}>
                {this.props.children(width, height, hasComputed)}
            </div>
        )
    }
}

Ratio.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    children: PropTypes.func.isRequired
}

Ratio.defaultProps = {
    x: 3,
    y: 4
}
 
export default Ratio;