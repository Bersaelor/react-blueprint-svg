/**
 * @className Blueprint
 */

import * as React from 'react'
import convert from 'react-from-dom';
import Grid from './components/Grid'
import Statusbar from './components/Statusbar'
import styles from './styles.css'
import i18n from './localization/i18n';

import { I18nextProvider } from 'react-i18next';

export type Props = { svg: string }

const Blueprint = ({ svg }: Props) => {

  const [zoom] = React.useState(1);

  const svgNode = convert(svg)

  return <I18nextProvider i18n={i18n}>
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
        <div id="rendering-options-menu" className={`${styles.view} noselect`}>
          <div id="params"></div>
        </div>
      </div>
      <div id="notes"></div>

      <Statusbar point={[0, 1]} zoom={zoom} />

    </section>
  </I18nextProvider>
}

export default Blueprint