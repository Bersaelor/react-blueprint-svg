/**
 * @className OptionsMenu
 */

import * as React from 'react'
import styles from './OptionsMenu.css'
import { useTranslation } from "react-i18next";
import { store, dispatchStore } from '../store';

export type IOptions = {
    fitOnScreen: boolean
    showGrid: boolean
    showPathNames: boolean
    showPathFlow: boolean
}
export type Props = {
    measurement: string
}

const OptionsMenu = ({ measurement }: Props) => {
    const { options, view } = React.useContext(store)
    const dispatch = React.useContext(dispatchStore)

    const { t, i18n } = useTranslation()

    const zoomString = view.zoom.toLocaleString(i18n.language, { style: "percent" })
    
    return <div className={`${styles.optionsMenu} noselect`}>
        <div className={styles.measurement}>{measurement}</div>
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