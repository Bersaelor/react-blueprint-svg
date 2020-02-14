import * as React from 'react'
import styles from './Statusbar.css'
import { useTranslation } from "react-i18next";
import { store } from '../store';
import { getCursorCoordinates } from '../geometry'

function Statusbar() {
    const { i18n } = useTranslation()
    const { view } = React.useContext(store)

    const viewWidth = view.viewSize[0] / view.scale
    var detail = 0

    while (viewWidth && viewWidth < Math.pow(10, -(detail-2))) detail++
    const options = {
        maximumFractionDigits: detail,
        minimumFractionDigits: detail
    }
    const coo = getCursorCoordinates(view)
    const x = coo[0].toLocaleString(i18n.language, options)
    const y = coo[1].toLocaleString(i18n.language, options)

    return <div className={styles.statusbar} >
        { `x: ${ x }, y: ${ y } | zoom: ${ view.scale.toLocaleString(i18n.language, {style: "percent"}) }` }
    </div>
}

export default Statusbar