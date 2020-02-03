/**
 * @className OptionsMenu
 */

import * as React from 'react'
import { connect } from 'react-redux'
import { RootState, IOptions } from '../store/reducers'
import { 
    toggleFitScreen,
    toggleGrid, 
    togglePathFlow, 
    togglePathNames 
} from '../store/actions';

import styles from './OptionsMenu.css'
import { useTranslation } from "react-i18next";

export type Props = {
    measurement: string
    options: IOptions
    zoom: number
    toggleFitScreen: () => void,
    toggleGrid: () => void,
    togglePathFlow: () => void,
    togglePathNames: () => void,
}

const OptionsMenu = ({ 
    measurement, 
    zoom, options,
    toggleFitScreen, toggleGrid, togglePathFlow, togglePathNames 
}: Props) => {

    const { t, i18n } = useTranslation()

    const zoomString = zoom.toLocaleString(i18n.language, { style: "percent" })
    
    return <div className={`${styles.optionsMenu} noselect`}>
        <div className={styles.measurement}>{measurement}</div>
        <div className={styles.viewControls}>
            <div> <label>
                <input type="checkbox" checked={options.fitOnScreen} onChange={ () => toggleFitScreen() } />
                {t("OptionsMenu.fitOnScreen").toLocaleLowerCase()} <span className={styles.zoomUnit}>[{zoomString}]</span>
            </label></div>
            <div><label>
                <input type="checkbox" checked={options.showGrid} onChange={ () => toggleGrid() } /> 
                {t("OptionsMenu.showGrid").toLocaleLowerCase()}
            </label></div>
            <div><label>
                <input type="checkbox" checked={options.showPathNames} onChange={ () => togglePathNames() } />
                {t("OptionsMenu.showPathNames").toLocaleLowerCase()}
            </label></div>
            <div><label>
                <input type="checkbox" checked={options.showPathFlow} onChange={ () => togglePathFlow() } /> 
                {t("OptionsMenu.showPathFlow").toLocaleLowerCase()}
            </label></div>
        </div>
    </div>
}

const OptionsMenuConnected = connect((state: RootState) => ({
    zoom: state.view.zoom,
    options: state.options,
}), {
    toggleFitScreen: toggleFitScreen,
    toggleGrid: toggleGrid,
    togglePathFlow: togglePathFlow,
    togglePathNames: togglePathNames,
})(OptionsMenu)

export default OptionsMenuConnected