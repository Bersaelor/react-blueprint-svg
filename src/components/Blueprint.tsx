/**
 * @className Blueprint
 */

import * as React from 'react'
const { useState, useEffect } = React
import convert from 'react-from-dom';
import { connect } from 'react-redux'
import { RootState, IOptions } from '../store/reducers'
import { onMouseWheel } from '../store/actions';
import Grid from './Grid'
import Statusbar from './Statusbar'
import OptionsMenu from './OptionsMenu'
import styles from './Blueprint.css'
import { useTranslation } from "react-i18next";

export type Props = { 
  svg: string
  options: IOptions
  zoom: number
  onMouseWheel: (delta: number) => void,
}

interface SVGProps {
  width: string
  height: string
  viewBox: string
  xmlns: string
  children: any[]
}

const Blueprint = ({ svg, zoom, options, onMouseWheel }: Props) => {

  const [measurement] = useState("units");
  const [isExpanded, setIsExpanded] = useState(false);
  const [svgNode, setSVGNode] = useState<React.ReactElement<SVGProps, any>>()
  const { t } = useTranslation()
 
  const svgStyle = {
    marginLeft: 70,
    marginTop: 70
  }

  const width = 100 * zoom
  const height = 100 * zoom

  useEffect(() => {
    var svgNode = convert(svg) as React.ReactElement<SVGProps, any>
    setSVGNode(svgNode)
    console.log("Converted svg string to ", svgNode)
  }, [svg])

  return <>
    <header>
      <div className={`${styles.renderingOptionsTop} ${!isExpanded ? styles.collapsedRenderingOptionsTop : ""}`}>
        <button className={styles.renderOptionsButton} onClick={() => setIsExpanded(!isExpanded)}>{t("blueprint.renderingOptions")} {isExpanded ? "▴" : "▾"}</button>
      </div>
    </header>

    <section
      onWheel={(e) => onMouseWheel(e.deltaY) }
      className={styles.blueprintCanvas}
    >
      {options.showGrid ? <Grid /> : null}

      <div className={styles.viewParams}>
        <div className={`${styles.view} noselect`} touch-action="none">
          <div id="view-svg-container">
            {svgNode ? <svg {...svgNode.props} width={width} height={height} style={svgStyle} /> : null}
          </div>
          <svg className={styles.pointers} xmlns="http://www.w3.org/2000/svg"></svg>
          <div className={styles.touchShield}></div>
        </div>
        {isExpanded ? <OptionsMenu measurement={measurement} /> : null}  
      </div>

      <Statusbar point={[0, 1]} zoom={zoom} />

    </section>
  </>
}

const BlueprintConnected = connect((state: RootState) => ({
  zoom: state.view.zoom,
  options: state.options,
}), {
  onMouseWheel: onMouseWheel
})(Blueprint)

export default BlueprintConnected