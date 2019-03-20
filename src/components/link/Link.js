import React, { createRef, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import theme from './theme.css';
import uiUtilities from '@teamleader/ui-utilities';

class Link extends PureComponent {
  linkNode = createRef();

  blur() {
    if (this.linkNode.current.blur) {
      this.linkNode.current.blur();
    }
  }

  handleMouseUp = event => {
    const { onMouseUp } = this.props;

    this.blur();
    onMouseUp && onMouseUp(event);
  };

  handleMouseLeave = event => {
    const { onMouseLeave } = this.props;

    this.blur();
    onMouseLeave && onMouseLeave(event);
  };

  render() {
    const { children, className, disabled, icon, iconPlacement, element, inherit, ...others } = this.props;

    const classNames = cx(
      uiUtilities['reset-font-smoothing'],
      theme['link'],
      {
        [theme['is-disabled']]: disabled,
        [theme['inherit']]: inherit,
        [theme['has-icon']]: icon,
      },
      className,
    );

    const ChildrenWrapper = icon ? 'span' : Fragment;
    const Element = element;

    return (
      <Element
        ref={this.linkNode}
        className={classNames}
        data-teamleader-ui="link"
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        {...others}
      >
        {icon && iconPlacement === 'left' && icon}
        <ChildrenWrapper>{children}</ChildrenWrapper>
        {icon && iconPlacement === 'right' && icon}
      </Element>
    );
  }
}

Link.propTypes = {
  /** The content to display inside the link. */
  children: PropTypes.any.isRequired,
  /** A class name for the link to give custom styles. */
  className: PropTypes.string,
  /** If true, component will be disabled. */
  disabled: PropTypes.bool,
  /** The icon displayed inside the button. */
  icon: PropTypes.element,
  /** The position of the icon inside the button. */
  iconPlacement: PropTypes.oneOf(['left', 'right']),
  /** If true, the link style inherits the parent element style. */
  inherit: PropTypes.bool,
  /** A custom element to be rendered */
  element: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /** Callback function that is fired when mouse leaves the component. */
  onMouseLeave: PropTypes.func,
  /** Callback function that is fired when the mouse button is released. */
  onMouseUp: PropTypes.func,
};

Link.defaultProps = {
  className: '',
  disabled: false,
  element: 'a',
  inherit: true,
};

export default Link;
