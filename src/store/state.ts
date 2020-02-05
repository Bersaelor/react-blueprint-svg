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
    cursor: makerjs.IPoint
    isMouseDown: boolean
    margin: makerjs.IPoint
    scale: number
    viewOffset: makerjs.IPoint
} = {
    cursor: [0,0],
    isMouseDown: false,
    margin: [70, 70],
    scale: 1,
    viewOffset: [0,0],
}

const initialState: RootState = {
    options: initialOptions,
    view: initialView
}

export { initialState, RootState }