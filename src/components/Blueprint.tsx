/**
 * @className Blueprint
 */

import * as React from 'react'
import convert from 'react-from-dom';
import Grid from './Grid'
import Statusbar from './Statusbar'
import styles from './Blueprint.css'
import { useTranslation } from "react-i18next";

export type Props = { svg: string }

const Blueprint = ({ svg }: Props) => {

  const [zoom] = React.useState(1);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { t } = useTranslation()

  const svgNode = convert(svg)

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
        {isExpanded ?
          <div className={`${styles.renderingOptionsMenu} noselect`}>
            <div id="params"></div>
          </div> : ""
        }
      </div>

      <Statusbar point={[0, 1]} zoom={zoom} />

    </section>
  </>
}

export default Blueprint