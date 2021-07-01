import React, { forwardRef, PureComponent } from 'react';
import ReactSelect from 'react-select';
import ReactCreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';
import { IconCloseSmallOutline, IconChevronDownSmallOutline } from '@teamleader/ui-icons';
import Box, { omitBoxProps, pickBoxProps } from '../box';
import Icon from '../icon';
import ValidationText from '../validationText';
import { Heading4, Monospaced } from '../typography';
import { COLOR } from '../../constants';
import theme from './theme.css';
import cx from 'classnames';
import uiUtilities from '@teamleader/ui-utilities';

const minHeightBySizeMap = {
  tiny: 24,
  small: 30,
  medium: 36,
  large: 48,
};
class Select extends PureComponent {
  getClearIndicatorStyles = (base) => {
    const { inverse } = this.props;

    return {
      ...base,
      color: inverse ? COLOR.TEAL.LIGHTEST : COLOR.TEAL.DARK,
      '&:hover': {
        color: inverse ? COLOR.NEUTRAL.LIGHTEST : COLOR.TEAL.DARKEST,
      },
      cursor: 'pointer',
      svg: {
        height: '14px',
        width: '14px',
      },
    };
  };

  getControlStyles = (base, { isDisabled, isFocused }) => {
    const { error, inverse, size, success, warning, width } = this.props;

    const commonStyles = {
      ...base,
      minHeight: minHeightBySizeMap[size],
      width,
    };

    if (inverse) {
      return {
        ...commonStyles,
        backgroundColor: isDisabled ? COLOR.TEAL.DARK : COLOR.TEAL.NORMAL,
        '&:hover': {
          borderColor: !error && !warning && !success && COLOR.TEAL.LIGHT,
        },
        borderColor: error
          ? COLOR.RUBY.LIGHT
          : warning
          ? COLOR.GOLD.LIGHT
          : success
          ? COLOR.MINT.LIGHT
          : isDisabled
          ? COLOR.TEAL.DARK
          : isFocused
          ? COLOR.TEAL.LIGHT
          : COLOR.TEAL.NORMAL,
        boxShadow: error
          ? `0 0 0 1px ${COLOR.RUBY.LIGHT}`
          : warning
          ? `0 0 0 1px ${COLOR.GOLD.LIGHT}`
          : success
          ? `0 0 0 1px ${COLOR.MINT.LIGHT}`
          : isFocused
          ? `0 0 0 1px ${COLOR.TEAL.LIGHT}`
          : 'none',
      };
    }

    return {
      ...commonStyles,
      backgroundColor: isDisabled ? COLOR.NEUTRAL.NORMAL : COLOR.NEUTRAL.LIGHTEST,
      '&:hover': {
        borderColor: !error && !warning && !success && COLOR.NEUTRAL.DARKEST,
      },
      borderColor: error
        ? COLOR.RUBY.DARK
        : warning
        ? COLOR.GOLD.DARK
        : success
        ? COLOR.MINT.DARK
        : isDisabled
        ? COLOR.NEUTRAL.NORMAL
        : isFocused
        ? COLOR.NEUTRAL.DARKEST
        : COLOR.NEUTRAL.DARK,
      boxShadow: error
        ? `0 0 0 1px ${COLOR.RUBY.DARK}`
        : warning
        ? `0 0 0 1px ${COLOR.GOLD.DARK}`
        : success
        ? `0 0 0 1px ${COLOR.MINT.DARK}`
        : isFocused
        ? `0 0 0 1px ${COLOR.NEUTRAL.DARKEST}`
        : 'none',
    };
  };

  getGroupStyles = (base) => {
    const { inverse } = this.props;

    return {
      ...base,
      borderBottomColor: inverse ? COLOR.TEAL.LIGHT : COLOR.NEUTRAL.NORMAL,
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px',
      '&:last-child': {
        borderWidth: 0,
      },
    };
  };

  getGroupHeadingStyles = (base) => {
    const { inverse } = this.props;

    return {
      ...base,
      color: inverse ? COLOR.NEUTRAL.LIGHTEST : COLOR.TEAL.DARKEST,
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '0.6px',
    };
  };

  getInput = (base) => {
    return {
      ...base,
      marginLeft: '2px',
      paddingBottom: 0,
      paddingTop: 0,
    };
  };

  getMenuPortalStyles = (base) => {
    const { inverse, menuWidth } = this.props;

    return {
      ...base,
      ...(menuWidth && { width: menuWidth }),
      backgroundColor: inverse ? COLOR.TEAL.NORMAL : COLOR.NEUTRAL.LIGHTEST,
      fontFamily: 'Inter',
      fontSize: '14px',
      fontWeight: 400,
      fontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      zIndex: 500,
    };
  };

  getMultiValueStyles = (base) => {
    const { inverse } = this.props;

    return {
      ...base,
      borderColor: inverse ? COLOR.TEAL.DARK : COLOR.NEUTRAL.NORMAL,
      borderStyle: 'solid',
      borderWidth: '1px',
      borderRadius: '4px',
      margin: '1px',
    };
  };

  getMultiValueLabelStyles = (base) => {
    const { inverse, size } = this.props;

    return {
      ...base,
      backgroundColor: inverse ? COLOR.TEAL.DARK : COLOR.NEUTRAL.LIGHT,
      borderRadius: 0,
      color: inverse ? COLOR.NEUTRAL.LIGHTEST : COLOR.TEAL.DARKEST,
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: size === 'tiny' || size === 'small' ? '12px' : '14px',
      lineHeight: size === 'tiny' || size === 'small' ? '1' : '18px',
      padding: size === 'tiny' ? '3px' : size === 'large' ? '9px' : '6px',
    };
  };

  getMultiValueRemoveStyles = (base) => {
    const { inverse, size } = this.props;

    return {
      ...base,
      backgroundColor: inverse ? COLOR.TEAL.DARK : COLOR.NEUTRAL.LIGHT,
      borderRadius: 0,
      color: inverse ? COLOR.NEUTRAL.LIGHTEST : COLOR.TEAL.DARKEST,
      '&:hover': {
        backgroundColor: inverse ? COLOR.TEAL.DARKEST : COLOR.NEUTRAL.NORMAL,
        color: inverse ? COLOR.NEUTRAL.LIGHTEST : COLOR.TEAL.DARKEST,
      },
      paddingLeft: size === 'tiny' ? '3px' : '6px',
      paddingRight: size === 'tiny' ? '3px' : '6px',
      transition: 'background-color .35s cubic-bezier(.4, 0, .2, 1)',
    };
  };

  getOptionStyles = (base, { isDisabled, isFocused, isSelected }) => {
    const { truncateOptionText } = this.props;
    const commonStyles = {
      ...base,
      ...(truncateOptionText
        ? {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }
        : {
            wordBreak: 'break-word',
          }),
      padding: '8px 12px',
    };

    if (this.props.inverse) {
      return {
        ...commonStyles,
        color: isDisabled
          ? COLOR.TEAL.LIGHT
          : isSelected
          ? COLOR.NEUTRAL.LIGHTEST
          : isFocused
          ? COLOR.TEAL.DARK
          : COLOR.NEUTRAL.LIGHTEST,
        backgroundColor: isSelected ? COLOR.TEAL.DARK : isFocused ? COLOR.TEAL.LIGHT : COLOR.TEAL.NORMAL,
        '&:active': {
          backgroundColor: isDisabled ? COLOR.TEAL.NORMAL : COLOR.TEAL.DARK,
          color: isDisabled ? COLOR.TEAL.LIGHT : COLOR.NEUTRAL.LIGHTEST,
        },
      };
    }

    return {
      ...commonStyles,
      color: isDisabled ? COLOR.NEUTRAL.DARK : COLOR.TEAL.DARK,
      backgroundColor: isSelected ? COLOR.AQUA.LIGHTEST : isFocused ? COLOR.NEUTRAL.LIGHT : COLOR.NEUTRAL.LIGHTEST,
      '&:active': {
        backgroundColor: isDisabled ? COLOR.NEUTRAL.LIGHTEST : COLOR.AQUA.LIGHTEST,
        color: isDisabled ? COLOR.NEUTRAL.DARK : COLOR.TEAL.DARK,
      },
    };
  };

  getPlaceholderStyles = (base, { isDisabled }) => {
    const { inverse } = this.props;

    const commonStyles = {
      ...base,
      marginLeft: '2px',
      marginRight: '2px',
      whiteSpace: 'nowrap',
    };

    if (inverse) {
      return {
        ...commonStyles,
        color: isDisabled ? COLOR.TEAL.NORMAL : COLOR.TEAL.LIGHT,
      };
    }

    return {
      ...commonStyles,
      color: COLOR.NEUTRAL.DARKEST,
    };
  };

  getSingleValueStyles = (base) => ({
    ...base,
    color: this.props.inverse ? COLOR.NEUTRAL.LIGHTEST : COLOR.TEAL.DARKEST,
  });

  getValueContainerStyles = (base, { isMulti, hasValue }) => {
    const { size } = this.props;

    return {
      ...base,
      minHeight: minHeightBySizeMap[size] - 2,
      lineHeight: '18px',
      padding: isMulti && hasValue && size !== 'large' ? 0 : '0 4px',
    };
  };

  getStyles = () => ({
    clearIndicator: this.getClearIndicatorStyles,
    control: this.getControlStyles,
    group: this.getGroupStyles,
    groupHeading: this.getGroupHeadingStyles,
    input: this.getInput,
    menuPortal: this.getMenuPortalStyles,
    multiValue: this.getMultiValueStyles,
    multiValueLabel: this.getMultiValueLabelStyles,
    multiValueRemove: this.getMultiValueRemoveStyles,
    option: this.getOptionStyles,
    placeholder: this.getPlaceholderStyles,
    singleValue: this.getSingleValueStyles,
    valueContainer: this.getValueContainerStyles,
  });

  getClearIndicator =
    () =>
    ({ innerProps, isMulti, getValue }) => {
      const value = getValue();

      return (
        <Box display="flex" alignItems="center" borderRadius="rounded" className={theme['select-clear']}>
          {isMulti && (
            <Heading4
              paddingLeft={2}
              paddingRight={1}
              color="neutral"
              tint="darkest"
              borderTopLeftRadius="rounded"
              borderBottomLeftRadius="rounded"
              borderTopRightRadius={isMulti ? 'square' : 'rounded'}
              borderBottomRightRadius={isMulti ? 'square' : 'rounded'}
            >
              <Monospaced>{(value ?? []).length}</Monospaced>
            </Heading4>
          )}
          <Box
            alignItems="center"
            display="flex"
            paddingHorizontal={1}
            borderTopLeftRadius={isMulti ? 'square' : 'rounded'}
            borderBottomLeftRadius={isMulti ? 'square' : 'rounded'}
            borderTopRightRadius="rounded"
            borderBottomRightRadius="rounded"
            className={theme['select-clear-icon']}
            {...innerProps}
          >
            <Icon color="neutral" tint="darkest" opacity={1}>
              <IconCloseSmallOutline />
            </Icon>
          </Box>
        </Box>
      );
    };

  getDropDownIndicator = () => () => {
    const { inverse } = this.props;

    return (
      <Icon
        alignItems="center"
        className={theme['dropdown-indicator']}
        color={inverse ? 'teal' : 'neutral'}
        display="flex"
        justifyContent="center"
        tint={inverse ? 'lightest' : 'darkest'}
      >
        <IconChevronDownSmallOutline />
      </Icon>
    );
  };

  render() {
    const {
      components,
      creatable,
      error,
      inverse,
      helpText,
      menuPortalTarget,
      size,
      success,
      warning,
      forwardedRef,
      ...otherProps
    } = this.props;

    const boxProps = pickBoxProps(otherProps);
    const restProps = omitBoxProps(otherProps);

    const wrapperClassnames = cx(theme[`is-${size}`], {
      [theme['has-error']]: error,
      [theme['is-inverse']]: inverse,
    });

    const Element = creatable ? ReactCreatableSelect : ReactSelect;
    const portalTarget = menuPortalTarget || (typeof window !== 'undefined' ? window.document.body : undefined);

    return (
      <Box className={wrapperClassnames} {...boxProps}>
        <Element
          ref={forwardedRef}
          className={cx(uiUtilities['reset-font-smoothing'], theme['select'])}
          components={{
            ClearIndicator: this.getClearIndicator(),
            DropdownIndicator: this.getDropDownIndicator(),
            IndicatorSeparator: null,
            ...components,
          }}
          hideSelectedOptions={false}
          menuPlacement="auto"
          menuPortalTarget={portalTarget}
          menuShouldBlockScroll
          styles={this.getStyles()}
          size={size}
          {...restProps}
        />
        <ValidationText error={error} help={helpText} inverse={inverse} success={success} warning={warning} />
      </Box>
    );
  }
}

Select.propTypes = {
  /** Override default components with your own. Pass an object with correct the key and its replacing component */
  components: PropTypes.object,
  /** If true, it's possible to create a new option that is not in the list. */
  creatable: PropTypes.bool,
  /** The text string/element to use as error message below the input. */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** The text string to use as help text below the input. */
  helpText: PropTypes.string,
  /** Boolean indicating whether the select should render as inverse. */
  inverse: PropTypes.bool,
  /** The HTML DOM node on which the portal should append */
  menuPortalTarget: PropTypes.instanceOf(Element),
  /** A custom width for the menu dropdown */
  menuWidth: PropTypes.string,
  /** Boolean indicating whether the select option text should render on one single line. */
  truncateOptionText: PropTypes.bool,
  /** Size of the input element. */
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
  /** The text string/element to use as success message below the input. */
  success: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** Selected option value(s) */
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
  /** The text to use as warning message below the input. */
  warning: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** A custom width for the input field */
  width: PropTypes.string,
};

Select.defaultProps = {
  creatable: false,
  inverse: false,
  size: 'medium',
  width: '100%',
};

export default forwardRef((props, ref) => <Select {...props} forwardedRef={ref} />);
