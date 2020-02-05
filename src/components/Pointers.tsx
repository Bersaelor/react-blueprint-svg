import * as React from 'react'
import styles from './Pointers.css'
import { store } from '../store';

const Pointers = ({ }: { }) => {
    const state = React.useContext(store)
  
    const x = state.view.cursor[0], y = state.view.cursor[1]

    return <svg className={styles.pointers} xmlns="http://www.w3.org/2000/svg">
        <g>
          <line className={styles.line} id="x" x1={x} y1="0" x2={x} y2="100%"></line>  
          <line className={styles.line} id="y" x1="0" y1={y} x2="100%" y2={y}></line>  
        </g>
    </svg>
  }
  
  export default Pointers