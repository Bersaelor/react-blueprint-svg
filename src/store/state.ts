
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

const initialView = {
    zoom: 1,
    cursor: [0,0],
    margin: [70, 70],
}

const initialState: RootState = {
    options: initialOptions,
    view: initialView
}

export { initialState, RootState }