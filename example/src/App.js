import React from 'react'
import Blueprint from 'react-blueprint-svg'
import SmileModel from './makerjs-smile'

function App() {
  let smile = new SmileModel();

  return (
    <div className="container">
      <h3><a href="https://github.com/Bersaelor/react-blueprint-svg">react-blueprint-svg</a> with <a href="https://github.com/danmarshall/makerjs-smile">smiley by Dan Marshall</a></h3>
      <Blueprint model={smile} />
    </div>
  )
}

export default App
