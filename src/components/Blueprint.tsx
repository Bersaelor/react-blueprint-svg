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

  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const { t } = useTranslation()
 
  const svgStyle = {
    marginLeft: view.panOffset[0],
    marginTop: view.panOffset[1]
  }

  const width = 100 * view.scale
  const height = 100 * view.scale
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

  const svgClasses = [
    options.showPathNames ? "" : styles.collapseannotation,
    options.showPathFlow ? "" : styles.collapseflow,
  ].join(" ")

  return <>
    <header>
      <div className={`${styles.renderingOptionsTop} ${!isMenuExpanded ? styles.collapsedRenderingOptionsTop : ""}`}>
        <button className={styles.renderOptionsButton} onClick={() => setIsMenuExpanded(!isMenuExpanded)}>{t("blueprint.renderingOptions")} {isMenuExpanded ? "▴" : "▾"}</button>
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
          <div id="view-svg-container" className={svgClasses}>
            {content.svgNode ? <svg {...content.svgNode.props} width={width} height={height} style={svgStyle} /> : null}
          </div>
          {view.isMouseDown ? <Pointers /> : null}
          <div className={styles.touchShield}></div>
        </div>
        {isMenuExpanded ? <OptionsMenu /> : null}
      </div>

      <Statusbar />

    </section>
  </>
}

export default Blueprint