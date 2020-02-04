/**
 * @className OptionsMenu
 */

import * as React from 'react'
import styles from './OptionsMenu.css'
import { useTranslation } from "react-i18next";
import { store } from '../store';

export type IOptions = {
    fitOnScreen: boolean
    showGrid: boolean
    showPathNames: boolean
    showPathFlow: boolean
}
export type Props = {
    measurement: string
    zoom: number
    options: IOptions
    setOptions: (arg: IOptions) => void
}

const OptionsMenu = ({ measurement, zoom, options, setOptions}: Props) => {
    const globalState = React.useContext(store)

    console.log("globalState: ", globalState)

    const { t, i18n } = useTranslation()

    const zoomString = zoom.toLocaleString(i18n.language, { style: "percent" })

    const flip = (key: string, value: boolean) => {
        var newOptions = Object.assign({}, options)
        newOptions[key] = value
        setOptions(newOptions)
    }
    
    return <div className={`${styles.optionsMenu} noselect`}>
        <div className={styles.measurement}>{measurement}</div>
        <div className={styles.viewControls}>
            <div> <label>
                <input type="checkbox" checked={options.fitOnScreen} onChange={ (event) => flip('fitOnScreen', event.target.checked) } />
                {t("OptionsMenu.fitOnScreen").toLocaleLowerCase()} <span className={styles.zoomUnit}>[{zoomString}]</span>
            </label></div>
            <div><label>
                <input type="checkbox" checked={options.showGrid} onChange={ (event) => flip('showGrid', event.target.checked) } /> 
                {t("OptionsMenu.showGrid").toLocaleLowerCase()}
            </label></div>
            <div><label>
                <input type="checkbox" checked={options.showPathNames} onChange={ (event) => flip('showPathNames', event.target.checked) } />
                {t("OptionsMenu.showPathNames").toLocaleLowerCase()}
            </label></div>
            <div><label>
                <input type="checkbox" checked={options.showPathFlow} onChange={ (event) => flip('showPathFlow', event.target.checked) } /> 
                {t("OptionsMenu.showPathFlow").toLocaleLowerCase()}
            </label></div>
        </div>
    </div>
}

export default OptionsMenu