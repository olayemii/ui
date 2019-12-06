import React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs/react';
import { Checkbox, Link, TextBody } from '../src';

const sizes = ['small', 'medium', 'large'];

export default {
  title: 'Form elements/Checkbox',

  parameters: {
    info: {
      propTablesExclude: [Link, TextBody],
    },
  },
};

export const defaultStory = () => (
  <Checkbox
    checked={boolean('Checked', false)}
    disabled={boolean('Disabled', false)}
    label={text('Label', 'I am the label')}
    size={select('Size', sizes, 'medium')}
  />
);

defaultStory.story = {
  name: 'Default',
};

export const withLinkInLabel = () => (
  <Checkbox
    checked={boolean('Checked', false)}
    disabled={boolean('Disabled', false)}
    size={select('Size', sizes, 'medium')}
  >
    <TextBody>
      I'm a medium label with a{' '}
      <Link href="#" inherit={false}>
        link
      </Link>{' '}
      inside
    </TextBody>
  </Checkbox>
);

withLinkInLabel.story = {
  name: 'With link in label',
};

export const withIndeterminateState = () => (
  <Checkbox
    indeterminate={boolean('Indeterminate', false)}
    label={text('Label', 'I am the label')}
    size={select('Size', sizes, 'medium')}
  />
);

withIndeterminateState.story = {
  name: 'With indeterminate state',
};
