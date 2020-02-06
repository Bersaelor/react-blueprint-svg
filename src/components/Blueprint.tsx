/**
 * @className Blueprint
 */

import * as React from 'react'
const { useState, useEffect, useRef } = React
import Grid from './Grid'
import Statusbar from './Statusbar'
import OptionsMenu from './OptionsMenu'
import styles from './Blueprint.css'
import { useTranslation } from "react-i18next";
import { store, dispatchStore } from '../store';
import Pointers from './Pointers';

const Blueprint = () => {
  const { options, view, content } = React.useContext(store)
  const dispatch = React.useContext(dispatchStore)

  const [measurement] = useState("units");
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation()
 
  const svgStyle = {
    marginLeft: view.panOffset[0],
    marginTop: view.panOffset[1]
  }

  const width = 100 * view.scale
  const height = 100 * view.scale

  console.log("Rerendering Blueprint")

  const mainViewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mainViewRef.current) {
      let boundingBox = mainViewRef.current.getBoundingClientRect()
      dispatch({ 
        type: 'SET_VIEW_MEASUREMENTS', 
        point: [boundingBox.left, boundingBox.top],
        size: [boundingBox.width, boundingBox.height],
      })
    }
  }, [mainViewRef])

  return <>
    <header>
      <div className={`${styles.renderingOptionsTop} ${!isExpanded ? styles.collapsedRenderingOptionsTop : ""}`}>
        <button className={styles.renderOptionsButton} onClick={() => setIsExpanded(!isExpanded)}>{t("blueprint.renderingOptions")} {isExpanded ? "▴" : "▾"}</button>
      </div>
    </header>

    <section className={styles.blueprintCanvas} >
      {options.showGrid ? <Grid /> : null}

      <div className={styles.viewParams} >
        <div ref={mainViewRef} className={`${styles.view} noselect`} touch-action="none"
          onMouseDown={(e) => { console.log("e: ", e); dispatch({ type: 'MOUSE_DOWN' }) }}
          onMouseMove={(e) => { e.persist(); dispatch({ type: 'MOUSE_MOVE', point: [e.clientX, e.clientY] }) }}
          onMouseUp={() => dispatch({ type: 'MOUSE_UP' })}
          onWheel={(e) => dispatch({ type: 'MOUSE_WHEEL', delta: e.deltaY })}
        >
          <div id="view-svg-container">
            {content.svgNode ? <svg {...content.svgNode.props} width={width} height={height} style={svgStyle} /> : null}
          </div>
          {view.isMouseDown ? <Pointers /> : null}
          <div className={styles.touchShield}></div>
        </div>
        {isExpanded ? <OptionsMenu measurement={measurement} /> : null}  
      </div>

      <Statusbar />

    </section>
  </>
}

export default Blueprint