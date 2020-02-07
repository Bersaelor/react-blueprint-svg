# react-blueprint-svg

> Pannable, zoomable SVG with menu of displaying options inspired by [maker.js](https://maker.js.org).

[![NPM](https://img.shields.io/npm/v/react-blueprint-svg.svg)](https://www.npmjs.com/package/react-blueprint-svg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<img alt="Example Illustration" src="/Screenshots/recording.gif?raw=true" width="75%">

[Link to Demo](https://bersaelor.github.io/react-blueprint-svg/)

## Install

```bash
npm install --save react-blueprint-svg
```

or 

```bash
yarn add react-blueprint-svg
```

## Usage

```tsx
import React from 'react'
import Blueprint from 'react-blueprint-svg'

function App() {
  let smile = new SmileModel();

  return <div className="container">
    <Blueprint model={smile} />
  </div>
}
```

## Input

The model property may either be `makerjs.IModel` object or `*.svg` data supplied as a string. When putting in a plain string, advanced display options like path names and flow are disabled, as those rely on `makerjs` to convert the model into annotated `<svg>`.

```tsx
  var model = {
    models: {
      ring1: new makerjs.models.Ring(40, 100),
      bc1: new makerjs.models.BoltCircle(90, 4, 10),
      bc2: new makerjs.models.BoltCircle(55, 7, 6, 30)
    }
  }

  return <Blueprint model={model} /> // no automatic sizing or path flow annotation
```

Output:
<img alt="Example Bolts" src="/Screenshots/bolts.jpg?raw=true" width="100%">



```tsx
  let svg = '<svg height="100" width="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />'
  
  return <Blueprint model={svg} /> // no automatic sizing or path flow annotation
```

Output:
<img alt="SVG Example" src="/Screenshots/circle.jpg?raw=true" width="100%">


## License

MIT © [Bersaelor](https://github.com/Bersaelor)
