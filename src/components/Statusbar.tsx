import * as React from 'react'
import { IPoint } from 'makerjs'
import styles from './Statusbar.css'
import { useTranslation } from "react-i18next";

export type Props = { point: IPoint, zoom: number }

function Statusbar({ point, zoom }: Props) {
    const { i18n } = useTranslation()

    return <div className={styles.statusbar} >
        { `x: ${ point[0] }, y: ${ point[1] } | zoom: ${ zoom.toLocaleString(i18n.language, {style: "percent"}) }` }
    </div>
}

export default Statusbar