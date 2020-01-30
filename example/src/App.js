import React, { Component } from 'react'
import Blueprint from 'react-blueprint-svg'
import SmileModel from './makerjs-smile'
import makerjs from 'makerjs';

export default class App extends Component {

  render() {
    let smile = new SmileModel();
    let svg = makerjs.exporter.toSVG(smile, { origin: [0, 0] });

    return (
      <div className="container">
        <h3>Example maker.js smiley:</h3>
        <Blueprint svg={svg} />
      </div>
    )
  }
}
