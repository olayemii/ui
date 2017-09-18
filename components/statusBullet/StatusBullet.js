import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'lodash.omit';
import theme from './theme.css';

class StatusBullet extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    mint: PropTypes.bool,
    teal: PropTypes.bool,
    violet: PropTypes.bool,
    ruby: PropTypes.bool,
    gold: PropTypes.bool,
    aqua: PropTypes.bool,
  };

  static defaultProps = {
    size: 'medium',
  };

  getColor () {
    const colors = [
      'mint',
      'violet',
      'ruby',
      'gold',
      'aqua',
      'neutral',
    ];

    return colors.find(color => this.props[color]);
  }

  render () {
    const {
      children,
      className,
      size,
      ...others
    } = this.props;

    const color = this.getColor();

    const classes = cx(
      theme.bullet,
      theme[color],
      theme[size],
      className,
    );

    const rest = omit(others, [
      'mint',
      'violet',
      'ruby',
      'gold',
      'aqua',
      'neutral',
    ]);

    return (
      <span className={classes} {...rest} data-teamleader-ui="status-bullet">
        {children}
      </span>
    );
  }
}

export default StatusBullet;
