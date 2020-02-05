import * as makerjs from 'makerjs'

type RootState = {
    options: typeof initialOptions
    view: typeof initialView
}

const initialOptions = {
    fitOnScreen: false,
    showGrid: true,
    showPathNames: false,
    showPathFlow: false,
}

const initialView: {
    scale: number
    viewOffset: makerjs.IPoint
    cursor: makerjs.IPoint
    margin: makerjs.IPoint
} = {
    scale: 1,
    viewOffset: [0,0],
    cursor: [0,0],
    margin: [70, 70],
}

const initialState: RootState = {
    options: initialOptions,
    view: initialView
}

export { initialState, RootState }