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

const Blueprint = ({ svg }: Props) => {

  const [zoom] = useState(1);
  const [measurement] = useState("units");
  const [options, setOptions] = useState(initialOptions);
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation()

  const svgNode = convert(svg)

  useEffect(() => {
    console.log("Options changed to ", options)
  }, [options])

  return <>
    <header>
      <div className={`${styles.renderingOptionsTop} ${!isExpanded ? styles.collapsedRenderingOptionsTop : ""}`}>
        <button className={styles.renderOptionsButton} onClick={() => setIsExpanded(!isExpanded)}>{t("blueprint.renderingOptions")} {isExpanded ? "▴" : "▾"}</button>
      </div>
    </header>

    <section className={styles.blueprintCanvas}>
      <Grid />

      <div className={styles.viewParams}>
        <div className={`${styles.view} noselect`} touch-action="none">
          <div id="view-svg-container">
            {svgNode}
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