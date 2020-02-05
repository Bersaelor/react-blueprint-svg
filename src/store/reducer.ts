import { ActionType } from './actions'
import { RootState } from './state'
import * as makerjs from 'makerjs'

const wheelZoomDelta = 0.1

export default (state: RootState, action: ActionType) => {
    switch (action.type) {
        case 'TOGGLE_FIT_SCREEN':
            const newFitOnScreen = !state.options.fitOnScreen
            const newViewOptions = newFitOnScreen ? { ...state.view, scale: 1 } : state.view
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
            var newScale = state.view.scale * (1 + sign * wheelZoomDelta)
            const newOptions = state.options.fitOnScreen && newScale !== 1 ? { ...state.options, fitOnScreen: false } : state.options
            return {
                options: newOptions,
                view: { ...state.view, scale: newScale }
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