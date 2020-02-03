
import {
  MOUSE_WHEEL,
  TOGGLE_FIT_SCREEN,
  TOGGLE_GRID,
  TOGGLE_PATH_FLOW,
  TOGGLE_PATH_NAMES
} from './actions'

export type IOptions = {
    fitOnScreen: boolean
    showGrid: boolean
    showPathNames: boolean
    showPathFlow: boolean
}

export type RootState = {
    options: IOptions
    view: typeof initialView
}

const initialOptions: IOptions = {
    fitOnScreen: false,
    showGrid: true,
    showPathNames: false,
    showPathFlow: false,
}

const initialView = {
    zoom: 1
}

const initialState = {
    options: initialOptions,
    view: initialView
}

const zoomFactor = 0.005
const zoomLimit = { min: 0.0001, max: 10000 }

export default (state = initialState, action: any) => {
    console.log("action: ", action)
    switch (action.type) {
        case MOUSE_WHEEL:
            var newZoom = state.view.zoom - action.delta * zoomFactor * state.view.zoom
            if (newZoom < zoomLimit.min) newZoom = zoomLimit.min
            else if (newZoom > zoomLimit.max) newZoom = zoomLimit.max
            console.log("wheel.deltaY: ", action.delta, " , newZoom: ", newZoom); 
            return { 
                ...state,
                view: { ...state.view, zoom: newZoom}
            }
        case TOGGLE_FIT_SCREEN:
            return { 
                ...state,
                options: { ...state.options, fitOnScreen: !state.options.fitOnScreen}
            }
        case TOGGLE_GRID:
            return { 
                ...state,
                options: { ...state.options, showGrid: !state.options.showGrid}
            }
        case TOGGLE_PATH_NAMES:
            return { 
                ...state,
                options: { ...state.options, showPathNames: !state.options.showPathNames}
            }
        case TOGGLE_PATH_FLOW:
            return { 
                ...state,
                options: { ...state.options, showPathFlow: !state.options.showPathFlow}
            }
        default:
            return state
    }
}