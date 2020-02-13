import * as React from 'react'
const { useState, useEffect, useRef } = React
import Grid from './Grid'
import Statusbar from './Statusbar'
import OptionsMenu from './OptionsMenu'
import styles from './Blueprint.css'
import { useTranslation } from "react-i18next";
import { store, dispatchStore } from '../store';
import Pointers from './Pointers';

const Blueprint: React.FunctionComponent<{}> = ({children}) => {
  const { options, view, content } = React.useContext(store)
  const dispatch = React.useContext(dispatchStore)

  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const { t } = useTranslation()
 
  const svgStyle = {
    marginLeft: view.panOffset[0],
    marginTop: view.panOffset[1]
  }

  var width = view.scale, height = view.scale
  if (content.svgNode && content.svgNode.props) {
    width = parseFloat(content.svgNode.props.width) * view.scale
    height = parseFloat(content.svgNode.props.height) * view.scale
  }
  const mainViewRef = useRef<HTMLDivElement>(null)

  const updatePageOffset = () => {
    if (mainViewRef && mainViewRef.current) {
      const b = mainViewRef.current.getBoundingClientRect()
      var el: HTMLElement = mainViewRef.current
      var curleft = 0, curtop = 0;
      if (el.offsetParent) {
          do {
              curleft += el.offsetLeft;
              curtop += el.offsetTop;
          } while (el = el.offsetParent as HTMLElement);
      }
      dispatch({ 
        type: 'SET_VIEW_MEASUREMENTS', 
        point: [curleft, curtop],
        size: [b.width, b.height],
      })
    }
  }

  // set up mainView size and attach the wheel handler
  useEffect(() => {
    if (mainViewRef.current) {
      updatePageOffset()

      // onWheel stopPropagation is currently broken on Chrome 73 ( https://github.com/facebook/react/issues/14856 )
      mainViewRef.current.addEventListener('wheel', e => {
        e.preventDefault()
        dispatch({ type: 'MOUSE_WHEEL', delta: e.deltaY })
      })
    }
  }, [mainViewRef])

  // set new sizes when window changes
  useEffect(() => {
    function handleResize() {
      updatePageOffset()
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const svgClasses = [
    options.showPathNames ? "" : styles.collapseannotation,
    options.showPathFlow ? "" : styles.collapseflow,
  ].join(" ")

  function handleMouse(type: 'MOUSE_DOWN' | 'MOUSE_MOVE' | 'MOUSE_UP') {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation()
      // console.log(`Event: ${type}, e.page ${[e.pageX, e.pageY]}`, )
      // console.log(`Event: ${type}, target: ${e.nativeEvent.target}`, )
      dispatch({type: type, point: [e.pageX, e.pageY]})
    }
  }
  return <>
    <header>
      { children }
      <div className={`${styles.renderingOptionsTop} ${!isMenuExpanded ? styles.collapsedRenderingOptionsTop : ""}`}>
        <button className={styles.renderOptionsButton} onClick={() => setIsMenuExpanded(!isMenuExpanded)}>{t("blueprint.renderingOptions")} {isMenuExpanded ? "▴" : "▾"}</button>
      </div>
    </header>

    <section className={styles.blueprintCanvas} >
      {options.showGrid ? <Grid /> : null}

      <div className={styles.viewParams} >
        <div ref={mainViewRef} className={`${styles.view} noselect`} touch-action="none"
          onMouseDown={handleMouse('MOUSE_DOWN')}
          onMouseMove={handleMouse('MOUSE_MOVE')}
          onMouseUp={handleMouse('MOUSE_UP')}
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