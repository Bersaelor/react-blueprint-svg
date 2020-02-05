import { ActionType } from './actions'
import { RootState } from './state'
import * as makerjs from 'makerjs'

const wheelZoomDelta = 0.1
const zoomLimit = { min: 0.0001, max: 10000 }

export default (state: RootState, action: ActionType) => {
    switch (action.type) {
        case 'TOGGLE_FIT_SCREEN':
            const newFitOnScreen = !state.options.fitOnScreen
            const newViewOptions = newFitOnScreen ? { ...state.view, zoom: 1 } : state.view
            return {
                view: newViewOptions,
                options: { ...state.options, fitOnScreen: newFitOnScreen }
            }
        case 'TOGGLE_GRID':
            return {
                ...state,
                options: { ...state.options, showGrid: !state.options.showGrid }
            }
        case 'TOGGLE_PATH_NAMES':
            return {
                ...state,
                options: { ...state.options, showPathNames: !state.options.showPathNames }
            }
        case 'TOGGLE_PATH_FLOW':
            return {
                ...state,
                options: { ...state.options, showPathFlow: !state.options.showPathFlow }
            }
        case 'SET_VIEW_OFFSET':
            return {
                ...state,
                view: { ...state.view, viewOffset: action.point }
            }
        case 'MOUSE_WHEEL':
            var sign = action.delta > 0 ? 1 : -1
            var newZoom = state.view.zoom * (1 + sign * wheelZoomDelta)
            if (newZoom < zoomLimit.min) newZoom = zoomLimit.min
            else if (newZoom > zoomLimit.max) newZoom = zoomLimit.max
            const newOptions = state.options.fitOnScreen && newZoom !== 1 ? { ...state.options, fitOnScreen: false } : state.options
            return {
                options: newOptions,
                view: { ...state.view, zoom: newZoom }
            }
        case 'MOUSE_MOVE':
            return {
                options: state.options,
                view: { ...state.view, cursor: makerjs.point.subtract(action.point, state.view.viewOffset) }
            }
        default:
            return state
    }
}