import React from 'react';
import ReactDOM from 'react-dom';
import { PopoverVertical } from '../../components/popover/';
import { RadioGroup, RadioButton } from '../../components/radio';
import Button from '../../components/button';

class PopoverTest extends React.Component {
  state = {
    active: false,
    direction: 'north',
    position: 'left',
    subtitle:'',
    title: 'My awesome Vertical Popover',
  };

  componentDidMount () {
    this.anchorEl = ReactDOM.findDOMNode(this.popoverToggleButton);
    this.forceUpdate();
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleSubtitleChange = (event) => {
    this.setState({ subtitle: event.target.value });
  };

  handleToggle = () => {
    this.setState({ active: !this.state.active });
  };

  handleDirectionChange = (value) => {
    this.setState({ direction: value });
  };

  handlePositionChange = (value) => {
    this.setState({ position: value });
  };

  actions = [
    { label: 'Cancel', onClick: this.handleToggle },
    { label: 'Save', onClick: this.handleToggle, primary: true },
  ];

  render () {
    const { direction, position } = this.state;

    return (
      <section>
        <h2>Vertical Popover</h2>

        <h3>Properties</h3>

        <h4>Direction</h4>
        <RadioGroup name="direction" value={direction} onChange={this.handleDirectionChange}>
          <RadioButton label="North" value="north" />
          <RadioButton label="South" value="south" />
        </RadioGroup>

        <h4>Position</h4>
        <RadioGroup name="position" value={position} onChange={this.handlePositionChange}>
          <RadioButton label="Left" value="left" />
          <RadioButton label="Center" value="center" />
          <RadioButton label="Right" value="right" />
        </RadioGroup>

        <h4>Title</h4>
        <p><input type="text" value={this.state.title} onChange={event => this.handleTitleChange(event)} /></p>

        <h4>Subtitle</h4>
        <p><input type="text" value={this.state.subtitle} onChange={event => this.handleSubtitleChange(event)} /></p>

        <h3>Preview</h3>
        <Button
          primary
          style={{ 'marginLeft': '50%' }}
          label="Show a vertical popover"
          onClick={this.handleToggle}
          ref={
            (button) => {
              this.popoverToggleButton = button;
            }
          }
        />

        { this.anchorEl &&
          <PopoverVertical
            actions={this.actions}
            active={this.state.active}
            anchorEl={this.anchorEl}
            direction={this.state.direction}
            position={this.state.position}
            onCloseClick={this.handleToggle}
            onEscKeyDown={this.handleToggle}
            onOverlayClick={this.handleToggle}
            title={this.state.title}
            subtitle={this.state.subtitle}
          >
            <p>Here you can add popover content.</p>
            <div className="highlight">
              <p>Here you can highlight some content.</p>
            </div>
          </PopoverVertical>
        }
      </section>
    );
  }
}

export default PopoverTest;
