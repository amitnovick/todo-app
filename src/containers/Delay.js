import React from 'react';
import styled from 'styled-components';

const Loader = styled.div`
  height: 10px;
  width: 100%;
  background-color: hotpink;
`;

class Delay extends React.Component {
  state = { timeoutOver: false };

  componentDidMount() {
    this.timer = window.setTimeout(() => {
      window.clearTimeout(this.timer);
      this.setState({ timeoutOver: true });
    }, this.props.timeout);
  }

  render() {
    const { component: Component, shouldShow, timeout, ...rest } = this.props;
    if (shouldShow) return <Component {...rest} />;
    else if (this.state.timeoutOver) return <Loader timeout={timeout} />;
    else return null;
  }
}

export default Delay;
