import React from 'react';
import { IconAddMediumOutline, IconAddSmallOutline } from '@teamleader/ui-icons';

import Button from './Button';

export default {
  component: Button,
  title: Button.displayName,
};

const Wrapper = ({ children, inverse = false }) => (
  <div
    style={{ minHeight: '50px', padding: '6px', display: 'flex', backgroundColor: inverse ? 'black' : 'transparent' }}
  >
    {children}
  </div>
);
const Spacer = () => <div style={{ width: '12px' }} />;

export const ButtonLevels = () => (
  <div>
    {['primary', 'secondary', 'destructive', 'timer'].map((level) => (
      <Wrapper key={level}>
        <Button level={level}>{level}</Button>
        <Spacer />
        <Button level={level} disabled>
          {level} disabled
        </Button>
        <Spacer />
        <Button level={level} active>
          {level} active
        </Button>
      </Wrapper>
    ))}
    <Wrapper>
      <Button level="link">link</Button>
      <Spacer />
      <Button level="link" disabled>
        link disabled
      </Button>
      <Spacer />
      <Spacer />
      <Button level="link" active>
        link active
      </Button>
      <Button level="link" inverse>
        link inverse
      </Button>
    </Wrapper>
    {['teal', 'neutral', 'mint', 'violet', 'ruby', 'gold', 'aqua', 'white'].map((color) => (
      <Wrapper key={color} inverse={color === 'white'}>
        <Button level="outline" color={color}>
          outline {color}
        </Button>
        <Spacer />
        <Button level="outline" color={color} disabled>
          outline {color} disabled
        </Button>
        <Spacer />
        <Button level="outline" color={color} active>
          outline {color} active
        </Button>
      </Wrapper>
    ))}
  </div>
);

export const ButtonSizes = () => (
  <div>
    {['primary', 'secondary', 'destructive', 'link', 'timer'].map((level) => (
      <React.Fragment key={level}>
        <Wrapper>
          <Button level={level} size="tiny">
            {level} tiny
          </Button>
          <Spacer />
          <Button level={level} size="small">
            {level} small
          </Button>
          <Spacer />
          <Button level={level} size="medium">
            {level} medium
          </Button>
          <Spacer />
          <Button level={level} size="large">
            {level} large
          </Button>
        </Wrapper>
        <Wrapper>
          <Button level={level} size="tiny" fullWidth>
            {level} tiny
          </Button>
        </Wrapper>
        <Wrapper>
          <Button level={level} size="small" fullWidth>
            {level} small
          </Button>
        </Wrapper>
        <Wrapper>
          <Button level={level} size="medium" fullWidth>
            {level} medium
          </Button>
        </Wrapper>
        <Wrapper>
          <Button level={level} size="large" fullWidth>
            {level} large
          </Button>
        </Wrapper>
      </React.Fragment>
    ))}
  </div>
);

export const ButtonWithIcons = () => (
  <div>
    {['primary', 'secondary', 'destructive', 'link', 'timer'].map((level) => (
      <React.Fragment key={level}>
        <Wrapper>
          <Button level={level} size="tiny" icon={<IconAddSmallOutline />}>
            {level} tiny
          </Button>
          <Spacer />
          <Button level={level} size="small" icon={<IconAddSmallOutline />}>
            {level} small
          </Button>
          <Spacer />
          <Button level={level} size="medium" icon={<IconAddMediumOutline />}>
            {level} medium
          </Button>
          <Spacer />
          <Button level={level} size="large" icon={<IconAddMediumOutline />}>
            {level} large
          </Button>
        </Wrapper>
        <Wrapper key={level}>
          <Button level={level} size="tiny" icon={<IconAddSmallOutline />} iconPlacement="right">
            {level} tiny
          </Button>
          <Spacer />
          <Button level={level} size="small" icon={<IconAddSmallOutline />} iconPlacement="right">
            {level} small
          </Button>
          <Spacer />
          <Button level={level} size="medium" icon={<IconAddMediumOutline />} iconPlacement="right">
            {level} medium
          </Button>
          <Spacer />
          <Button level={level} size="large" icon={<IconAddMediumOutline />} iconPlacement="right">
            {level} large
          </Button>
        </Wrapper>
      </React.Fragment>
    ))}
  </div>
);
