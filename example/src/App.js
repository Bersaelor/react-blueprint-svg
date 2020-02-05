import React from 'react'
import Blueprint from 'react-blueprint-svg'
import SmileModel from './makerjs-smile'
import makerjs from 'makerjs';

 function App() {
  let smile = new SmileModel();
  let svg = makerjs.exporter.toSVG(smile, { origin: [0, 0] });

  return (
    <div className="container">
      <h3><a href="https://github.com/Bersaelor/react-blueprint-svg">react-blueprint-svg</a> with <a href="https://github.com/danmarshall/makerjs-smile">smiley by Dan Marshall</a></h3>
      <Blueprint svg={svg} />
    </div>
  )
}

export default App
