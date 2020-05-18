import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  IconBellMediumOutline,
  IconCheckmarkBadgedMediumFilled,
  IconCloseMediumOutline,
  IconWarningBadgedMediumFilled,
} from '@teamleader/ui-icons';
import Box from '../box';
import Button from '../button';
import ButtonGroup from '../buttonGroup';
import Icon from '../icon';
import { IconButton } from '../iconButton';
import { Heading3, TextBody } from '../typography';

const backgroundColorMap = {
  error: 'ruby',
  info: 'neutral',
  success: 'mint',
  warning: 'gold',
};

const backgroundTintMap = {
  error: 'normal',
  info: 'normal',
  success: 'light',
  warning: 'light',
};

const iconMap = {
  error: IconWarningBadgedMediumFilled,
  info: IconBellMediumOutline,
  success: IconCheckmarkBadgedMediumFilled,
  warning: IconWarningBadgedMediumFilled,
};

const iconColorMap = {
  error: 'neutral',
  info: 'neutral',
  success: 'neutral',
  warning: 'gold',
};

const iconTintMap = {
  error: 'lightest',
  info: 'darkest',
  success: 'lightest',
  warning: 'dark',
};

class SilentBanner extends PureComponent {
  render() {
    const {
      children,
      onClose,
      primaryAction,
      primaryActionLabel,
      secondaryAction,
      secondaryActionLabel,
      showIcon,
      status,
      title,
      ...others
    } = this.props;

    const hasActions = Boolean(primaryAction || secondaryAction);
    const IconToRender = iconMap[status];

    return (
      <Box {...others} display="flex">
        {status && (
          <Box
            backgroundColor={backgroundColorMap[status]}
            backgroundTint={backgroundTintMap[status]}
            borderBottomLeftRadius="rounded"
            borderTopLeftRadius="rounded"
            paddingHorizontal={showIcon ? 2 : 1}
            paddingVertical={4}
          >
            {showIcon && (
              <Icon color={iconColorMap[status]} tint={iconTintMap[status]}>
                <IconToRender />
              </Icon>
            )}
          </Box>
        )}
        <Box
          borderColor="neutral"
          borderTint="normal"
          borderLeftWidth={status ? 0 : 1}
          borderTopWidth={1}
          borderRightWidth={1}
          borderBottomWidth={1}
          borderBottomRightRadius="rounded"
          borderTopRightRadius="rounded"
          borderBottomLeftRadius={status ? 'square' : 'rounded'}
          borderTopLeftRadius={status ? 'square' : 'rounded'}
          display="flex"
        >
          <Box padding={4}>
            {title && (
              <Heading3 color="teal" marginBottom={2}>
                {title}
              </Heading3>
            )}
            {children && <TextBody color="teal">{children}</TextBody>}
            {hasActions && (
              <ButtonGroup display="flex" justifyContent="flex-end" marginTop={4}>
                {secondaryAction && (
                  <Button level="link" size="small">
                    {secondaryActionLabel}
                  </Button>
                )}
                {primaryAction && <Button size="small">{primaryActionLabel}</Button>}
              </ButtonGroup>
            )}
          </Box>
          {onClose && (
            <Box paddingVertical={4} paddingRight={3}>
              <IconButton icon={<IconCloseMediumOutline />} marginLeft={-2} marginTop={-1} onClick={onClose} />
            </Box>
          )}
        </Box>
      </Box>
    );
  }
}

SilentBanner.propTypes = {
  /** The content to display inside the banner. */
  children: PropTypes.node,
  /** Callback function that is fired when the close button of the banner is clicked. */
  onClose: PropTypes.func,
  /** Callback function that is fired when the primary action button is clicked. */
  primaryAction: PropTypes.func,
  /** The primary action button label */
  primaryActionLabel: PropTypes.node,
  /** Callback function that is fired when the secondary action button is clicked. */
  secondaryAction: PropTypes.func,
  /** The secondary action button label */
  secondaryActionLabel: PropTypes.node,
  /** If true, an icon will show up depending on the status type */
  showIcon: PropTypes.bool,
  /** A status type to determine color and icon */
  status: PropTypes.oneOf(['info', 'error', 'success', 'warning']),
  /** The banner title */
  title: PropTypes.node,
};

export default SilentBanner;
