import * as React from 'react'
import styles from './Statusbar.css'
import { useTranslation } from "react-i18next";
import { store } from '../store';
import { getCursorCoordinates } from '../geometry'

function Statusbar() {
    const { i18n } = useTranslation()
    const state = React.useContext(store)

    const options = {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    }
    const coo = getCursorCoordinates(state)
    const x = coo[0].toLocaleString(i18n.language, options)
    const y = coo[1].toLocaleString(i18n.language, options)

    return <div className={styles.statusbar} >
        { `x: ${ x }, y: ${ y } | zoom: ${ state.view.scale.toLocaleString(i18n.language, {style: "percent"}) }` }
    </div>
}

export default Statusbar