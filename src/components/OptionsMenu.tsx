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
    
    return <div className={`${styles.optionsMenu} noselect`}>
        <div className={styles.measurement}>{`${modelSize[0]} x ${modelSize[1]} ${t("OptionsMenu.units")}`}</div>
        <div className={styles.viewControls}>
            <div> <label>
                <input type="checkbox" checked={options.fitOnScreen} onChange={ () => dispatch({ type: 'TOGGLE_FIT_SCREEN' }) } />
                {t("OptionsMenu.fitOnScreen").toLocaleLowerCase()} <span className={styles.zoomUnit}>[{zoomString}]</span>
            </label></div>
            <div><label>
                <input type="checkbox" checked={options.showGrid} onChange={ () => dispatch({ type: 'TOGGLE_GRID' }) } /> 
                {t("OptionsMenu.showGrid").toLocaleLowerCase()}
            </label></div>
            <div><label>
                <input type="checkbox" checked={options.showPathNames} onChange={ () => dispatch({ type: 'TOGGLE_PATH_NAMES' }) } />
                {t("OptionsMenu.showPathNames").toLocaleLowerCase()}
            </label></div>
            <div><label>
                <input type="checkbox" checked={options.showPathFlow} onChange={ () => dispatch({ type: 'TOGGLE_PATH_FLOW' }) } /> 
                {t("OptionsMenu.showPathFlow").toLocaleLowerCase()}
            </label></div>
        </div>
    </div>
}

export default OptionsMenu