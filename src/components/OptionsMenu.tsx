/**
 * @className OptionsMenu
 */

import * as React from 'react'
import styles from './OptionsMenu.css'
import { useTranslation } from "react-i18next";
import { store, dispatchStore } from '../store';
import { getNaturalSize } from '../geometry';

const OptionsMenu = () => {
    const { options, view, content } = React.useContext(store)
    const dispatch = React.useContext(dispatchStore)

    const { t, i18n } = useTranslation()

    const modelSize = content.measurement ? getNaturalSize(content.measurement) : ['?', '?']
    const zoomString = view.scale.toLocaleString(i18n.language, { style: "percent" })
    const arePathFeaturesTogglable = content.measurement !== null
    const numberOpt = { maximumFractionDigits: 2 }
    const xUnitScale = modelSize[0].toLocaleString(i18n.language, numberOpt)
    const yUnitScale = modelSize[1].toLocaleString(i18n.language, numberOpt)

    return <div className={`${styles.optionsMenu} noselect`}>
        <div className={styles.measurement}>{`${xUnitScale} x ${yUnitScale} ${options.unitString || t("OptionsMenu.units")}`}</div>
        <div className={styles.viewControls}>
            <div> <label>
                <input 
                    type="checkbox"
                    checked={options.fitOnScreen}
                    onChange={ () => dispatch({ type: 'TOGGLE_FIT_SCREEN' }) }
                    disabled={!arePathFeaturesTogglable}
                />
                {t("OptionsMenu.fitOnScreen").toLocaleLowerCase()} <span className={styles.zoomUnit}>[{zoomString}]</span>
            </label></div>
            <div><label>
                <input type="checkbox" checked={options.showGrid} onChange={() => dispatch({ type: 'TOGGLE_GRID' })} />
                {t("OptionsMenu.showGrid").toLocaleLowerCase()}
            </label></div>
            <div><label>
                <input
                    type="checkbox"
                    checked={options.showPathNames} 
                    onChange={() => dispatch({ type: 'TOGGLE_PATH_NAMES' })} 
                    disabled={!arePathFeaturesTogglable}
                />
                {t("OptionsMenu.showPathNames").toLocaleLowerCase()}
            </label></div>
            <div><label>
                <input
                    type="checkbox" 
                    checked={options.showPathFlow} 
                    onChange={() => dispatch({ type: 'TOGGLE_PATH_FLOW' })} 
                    disabled={!arePathFeaturesTogglable}
                />
                {t("OptionsMenu.showPathFlow").toLocaleLowerCase()}
            </label></div>
        </div>
    </div>
}

export default OptionsMenu