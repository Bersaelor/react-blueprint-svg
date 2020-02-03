/**
 * @className Blueprint
 */

import * as React from 'react'
const { useState, useEffect } = React
import convert from 'react-from-dom';
import Grid from './Grid'
import Statusbar from './Statusbar'
import OptionsMenu, { IOptions } from './OptionsMenu'
import styles from './Blueprint.css'
import { useTranslation } from "react-i18next";

export type Props = { svg: string }

const initialOptions: IOptions = {
  fitOnScreen: false,
  showGrid: true,
  showPathNames: false,
  showPathFlow: false,
}

interface SVGProps {
  width: string
  height: string
  viewBox: string
  xmlns: string
  children: any[]
}

const Blueprint = ({ svg }: Props) => {

  const [zoom, setZoom] = useState(1);
  const [measurement] = useState("units");
  const [options, setOptions] = useState(initialOptions);
  const [isExpanded, setIsExpanded] = useState(false);
  const [svgNode, setSVGNode] = useState<React.ReactElement<SVGProps, any>>()
  const { t } = useTranslation()
 
  const svgStyle = {
    marginLeft: 70,
    marginTop: 70
  }

  const width = 100 * zoom
  const height = 100 * zoom
  const zoomFactor = 0.005
  const zoomLimit = { min: 0.0001, max: 10000 }

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
      onWheel={(e) => {
         var newZoom = zoom - e.deltaY * zoomFactor * zoom
         console.log("wheel.deltaY: ", e.deltaY, " , newZoom: ", newZoom); 
         if (newZoom < zoomLimit.min) newZoom = zoomLimit.min
         else if (newZoom > zoomLimit.max) newZoom = zoomLimit.max
         setZoom(newZoom)
    }}
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
        {isExpanded ? <OptionsMenu
          measurement={measurement}
          zoom={zoom}
          options={options}
          setOptions={setOptions}
        /> : null}  
      </div>

      <Statusbar point={[0, 1]} zoom={zoom} />

    </section>
  </>
}

export default Blueprint