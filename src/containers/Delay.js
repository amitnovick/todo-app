import React from 'react';
import styles from './delay.module.css';

class Delay extends React.Component {
  state = { timeoutOver: false };

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({ timeoutOver: true });
    }, this.props.timeout);
  }

  render() {
    const { component: Component, shouldShow, timeout, ...rest } = this.props;
    if (shouldShow) return <Component {...rest} />;
    else if (this.state.timeoutOver)
      return <div className={styles['div-1']} timeout={timeout} />;
    else return null;
  }
}

export default Delay;
