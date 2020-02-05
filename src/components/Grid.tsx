import * as React from 'react'
import styles from './Grid.css'
import { store } from '../store';
import { getGridScale } from '../geometry';

const Grid = ({ }: { }) => {
  const state = React.useContext(store)
  let gridScale = getGridScale(state)

  return <svg className={styles.grid}>
      <defs>
        <pattern id="pattern1" x="0" y="0" width=".1" height=".1">
          <line x1="0" y1="0" x2="0" y2="100%" className={styles.gridLine1}></line>
          <line x1="0" y1="0" x2="100%" y2="0" className={styles.gridLine1}></line>
        </pattern>
        <pattern id="pattern10" x="0" y="0" width="1" height="1">
          <line x1="0" y1="0" x2="0" y2="100%" className={styles.gridLine10}></line>
          <line x1="0" y1="0" x2="100%" y2="0" className={styles.gridLine10}></line>
        </pattern>
        <pattern 
          id="gridPattern"
          x="0" y="0" 
          width={gridScale} height={gridScale} 
          patternUnits="userSpaceOnUse" patternTransform="translate(0,0)"
        >
          <rect id="gridPatternFill"
            fill="url(#pattern1)"
            width={gridScale} height={gridScale} 
            x="0" y="0"
          ></rect>
          <rect fill="url(#pattern10)" width="100%" height="100%" x="0" y="0"></rect>
        </pattern>
      </defs>
      <rect fill="url(#gridPattern)" width="100%" height="100%" x="0" y="0"></rect>
      <g id="crosshairs">
        <line x1="-100%" x2="100%" y1="0" y2="0"></line>
        <line x1="0" x2="0" y1="-100%" y2="100%"></line>
      </g>
    </svg>
}

export default Grid