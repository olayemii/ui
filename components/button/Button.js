import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

class Button extends Component {
	static propTypes = {
		children: PropTypes.node,
		className: PropTypes.string,
		disabled: PropTypes.bool,
		href: PropTypes.string,
		icon: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element
		]),
		label: PropTypes.string,
		neutral: PropTypes.bool,
		onMouseLeave: PropTypes.func,
		onMouseUp: PropTypes.func,
		primary: PropTypes.bool,
		raised: PropTypes.bool,
		theme: PropTypes.shape({
			accent: PropTypes.string,
			button: PropTypes.string,
			flat: PropTypes.string,
			floating: PropTypes.string,
			icon: PropTypes.string,
			inverse: PropTypes.string,
			mini: PropTypes.string,
			neutral: PropTypes.string,
			primary: PropTypes.string,
			raised: PropTypes.string,
			rippleWrapper: PropTypes.string,
			toggle: PropTypes.string
		}),
		type: PropTypes.string
	};

	static defaultProps = {
		accent: false,
		className: '',
		flat: false,
		floating: false,
		mini: false,
		neutral: true,
		primary: false,
		raised: false,
		type: 'button'
	};

	render () {
		const {
			children,
			className,
			href,
			icon,
			label,
			...others
		} = this.props;

		const element = href ? 'a' : 'button';
		const level = primary ? 'primary' : accent ? 'accent' : 'neutral';
		const shape = flat ? 'flat' : raised ? 'raised' : floating ? 'floating' : 'flat';

		const classes = classnames(theme.button, [ theme[ shape ] ], {
			[theme[ level ]]: neutral,
			[theme.mini]: mini,
			[theme.inverse]: inverse
		}, className);

		const props = {
			...others,
			href,
			ref: 'button',
			className: classes,
			disabled: this.props.disabled,
			onMouseUp: this.handleMouseUp,
			onMouseLeave: this.handleMouseLeave,
			type: !href ? type : null,
			'data-react-toolbox': 'button'
		};

		return React.createElement(element, props,
			icon ? <FontIcon className={theme.icon} value={icon} /> : null,
			label,
			children
		);
	}
}

export default Button;
