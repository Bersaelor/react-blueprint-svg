import * as React from 'react'
import { IPoint } from 'makerjs'
import styles from './Statusbar.css'
import { useTranslation } from "react-i18next";
import { store } from '../store';

export type Props = { point: IPoint }

function Statusbar({ point }: Props) {
    const { i18n } = useTranslation()
    const { view } = React.useContext(store)

    return <div className={styles.statusbar} >
        { `x: ${ point[0] }, y: ${ point[1] } | zoom: ${ view.zoom.toLocaleString(i18n.language, {style: "percent"}) }` }
    </div>
}

export default Statusbar