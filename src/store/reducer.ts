import { ActionType } from './actions'
import { RootState } from './state'
import * as makerjs from 'makerjs'
import { getCursorCoordinates } from '../geometry'

const wheelZoomDelta = 0.1
const p = makerjs.point

export default (state: RootState, action: ActionType) => {
    const { view } = state

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
            const sign = action.delta > 0 ? 1 : -1
            const newScale = view.scale * (1 + sign * wheelZoomDelta)
            const zoomRatio = newScale / state.view.scale
            const cursorCoo = getCursorCoordinates(view)
            const previousScaledCenter = p.scale(cursorCoo, view.scale);
            const currentScaledCenter = p.scale(previousScaledCenter, zoomRatio);
            const centerPointDiff = p.subtract(previousScaledCenter, currentScaledCenter);
            const newOptions = state.options.fitOnScreen && newScale !== 1 ? { ...state.options, fitOnScreen: false } : state.options
            return {
                options: newOptions,
                view: { ...state.view, scale: newScale, panOffset: p.add(view.panOffset, centerPointDiff) }
            }
        case 'MOUSE_DOWN':
            return { ...state, view: { ...state.view, isMouseDown: true }
        }
        case 'MOUSE_UP':
            return { ...state, view: { ...state.view, isMouseDown: false }
        }
        case 'MOUSE_MOVE':
            const newCursor = p.subtract(action.point, view.viewOffset)
            var panDelta: makerjs.IPoint = [0, 0]
            if (state.view.isMouseDown) panDelta = p.subtract(newCursor, view.cursor) 
            return {
                ...state,
                view: { ...view, cursor: newCursor, panOffset: p.add(view.panOffset, panDelta) }
            }
        default:
            return state
    }
}