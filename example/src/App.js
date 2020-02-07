import React from 'react'
import Blueprint from 'react-blueprint-svg'
import SmileModel from './makerjs-smile'
import * as makerjs from 'makerjs'

function App() {
  let model = new SmileModel();

  // let model = {
  //   models: {
  //     ring1: new makerjs.models.Ring(40, 100),
  //     bc1: new makerjs.models.BoltCircle(90, 4, 10),
  //     bc2: new makerjs.models.BoltCircle(55, 7, 6, 30)
  //   }
  // }
  return (
    <div className="container">
      <Blueprint model={model}> 
        <h3><a href="https://github.com/Bersaelor/react-blueprint-svg">react-blueprint-svg</a> with <a href="https://github.com/danmarshall/makerjs-smile">smiley by Dan Marshall</a></h3>
      </Blueprint>
    </div>
  )
}

export default App
