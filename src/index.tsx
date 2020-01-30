/**
 * @className Blueprint
 */

import * as React from 'react'
import styles from './styles.css'
import convert from 'react-from-dom';

export type Props = { svg: string }

const Blueprint = ({ svg }: Props) => {

  const svgNode = convert(svg)

  return <section className={styles.blueprintCanvas}>

    <svg className={styles.grid}>
      <defs>
        <pattern id="pattern1" x="0" y="0" width=".1" height=".1">
          <line x1="0" y1="0" x2="0" y2="100%" className={styles.gridLine1}></line>
          <line x1="0" y1="0" x2="100%" y2="0" className={styles.gridLine1}></line>
        </pattern>
        <pattern id="pattern10" x="0" y="0" width="1" height="1">
          <line x1="0" y1="0" x2="0" y2="100%" className={styles.gridLine10}></line>
          <line x1="0" y1="0" x2="100%" y2="0" className={styles.gridLine10}></line>
        </pattern>
        <pattern id="gridPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="translate(0,0)">
          <rect id="gridPatternFill" fill="url(#pattern1)" width="100" height="100" x="0" y="0"></rect>
          <rect fill="url(#pattern10)" width="100%" height="100%" x="0" y="0"></rect>
        </pattern>
      </defs>
      <rect fill="url(#gridPattern)" width="100%" height="100%" x="0" y="0"></rect>
      <g id="crosshairs">
        <line x1="-100%" x2="100%" y1="0" y2="0"></line>
        <line x1="0" x2="0" y1="-100%" y2="100%"></line>
      </g>
    </svg>

    <div className={styles.viewParams}>
      <div className={`${styles.view} noselect`} touch-action="none">
        <div id="view-svg-container">
          {svgNode}
        </div>
        <svg id="pointers" xmlns="http://www.w3.org/2000/svg"></svg>
        <div id="touch-shield"></div>
      </div>
      <div id="rendering-options-menu" className={`${styles.view} noselect`}>
        <div id="params"></div>
      </div>
    </div>
    <div id="notes"></div>

  </section>
}

export default Blueprint