import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'lodash.omit';
import theme from './theme.css';

class Section extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    white: PropTypes.bool,
    grey: PropTypes.bool,
    mint: PropTypes.bool,
    violet: PropTypes.bool,
    ruby: PropTypes.bool,
    gold: PropTypes.bool,
    aqua: PropTypes.bool,
    dark: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    white: true,
    grey: false,
    mint: false,
    violet: false,
    ruby: false,
    gold: false,
    aqua: false,
    dark: false,
  };

  getColor () {
    const colors = [
      'grey',
      'mint',
      'violet',
      'ruby',
      'gold',
      'aqua',
      'white',
    ];

    for (var i = 0; i < colors.length; i++) {
      const color = colors[i];
      if (this.props[color]) {
        return color;
      }
    }
  }

  isDark (color) {
    if (color !== 'white' && color !== 'grey') {
      return false;
    }

    return this.props.dark;
  }

  render () {
    const {
      children,
      className,
      ...others
    } = this.props;

    const color = this.getColor();
    const dark = this.isDark(color);

    const classes = cx(
      theme.section,
      className,
      theme[color],
      {
        [theme.dark]: dark,
      }
    );

    const rest = omit(others, [
      'white',
      'grey',
      'mint',
      'violet',
      'ruby',
      'gold',
      'aqua',
      'dark',
    ]);

    return (
      <div className={classes} {...rest}>
        {children}
      </div>
    );
  }
}

export default Section;
