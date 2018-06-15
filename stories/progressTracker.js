import React from 'react';
import PropTable from './components/propTable';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import { ProgressTracker } from '../components';

import { steps } from '../static/progressTracker/steps';

const colors = ['neutral', 'mint', 'aqua', 'violet', 'teal', 'gold', 'ruby'];

storiesOf('ProgressTracker', module)
  .addDecorator((story, context) => withInfo({ TableComponent: PropTable })(story)(context))
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add('Basic', () => (
    <ProgressTracker color={select('Color', colors, 'neutral')} activeStep={1}>
      {steps.map(step => {
        return <ProgressTracker.ProgressStep label={step.label} />;
      })}
    </ProgressTracker>
  ));
