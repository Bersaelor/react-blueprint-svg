import * as makerjs from 'makerjs'

type ViewState = typeof initialView
type RootState = {
    options: typeof initialOptions
    view: ViewState
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
    panOffset: makerjs.IPoint
    scale: number
    viewOffset: makerjs.IPoint
} = {
    cursor: [0,0],
    isMouseDown: false,
    panOffset: [0,0],
    scale: 1,
    viewOffset: [0,0],
}

const initialState: RootState = {
    options: initialOptions,
    view: initialView
}

export { initialState, RootState, ViewState }