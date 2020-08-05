import React from 'react'
import Blueprint from 'react-blueprint-svg'
import SmileModel from './makerjs-smile'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Slider from '@material-ui/core/Slider';

// import * as makerjs from 'makerjs'

function App() {

  const [smileSpan, setSmileSpan] = React.useState(45);
  const [isSmiling, setIsSmiling] = React.useState(3);

  let model = new SmileModel(smileSpan, isSmiling, 8, 20, 4, 8);

  const handleSmileSwitch = (event, newValue) => {
    setIsSmiling(newValue)
  }

  const handleSliderMoved = (event, newValue) => {
    setSmileSpan(newValue)
  }

  return (
    <div className="container">
      <div>
        <Blueprint model={model}>
          <h3><a href="https://github.com/Bersaelor/react-blueprint-svg">react-blueprint-svg</a> with <a href="https://github.com/danmarshall/makerjs-smile">smiley by Dan Marshall</a></h3>
        </Blueprint>
      </div>
      <div>
        <ToggleButtonGroup
          exclusive
          value={isSmiling}
          onChange={handleSmileSwitch}
        >
          <ToggleButton value={3}>
            <span role="img" aria-label="Laugh">😄</span>
          </ToggleButton>
          <ToggleButton value={0.5}>
            <span role="img" aria-label="Laugh">🙂</span>
          </ToggleButton>
        </ToggleButtonGroup>
        <Slider
          onChange={handleSliderMoved}
          value={smileSpan}
          valueLabelDisplay="auto"
          min={0}
          max={90}
        />
      </div>
    </div>
  )
}

export default App