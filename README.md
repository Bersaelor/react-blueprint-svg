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

## License

MIT © [Bersaelor](https://github.com/Bersaelor)
