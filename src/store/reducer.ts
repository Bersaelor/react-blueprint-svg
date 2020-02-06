import * as makerjs from 'makerjs'
import convert from 'react-from-dom';

import { ActionType } from './actions'
import { RootState, SVGProps } from './state'
import { getCursorCoordinates, naturalFit, screenFit, renderOptions } from '../geometry'

const wheelZoomDelta = 0.1
const p = makerjs.point

export default (state: RootState, action: ActionType) => {
    const { view } = state

    switch (action.type) {
        case 'STORE_MODEL':
            const svgString = action.model ? makerjs.exporter.toSVG(action.model, renderOptions(view)) : null
            const svgNode = svgString ? convert(svgString) as React.ReactElement<SVGProps, any> : null
            const measurement = action.model ? makerjs.measure.modelExtents(action.model) : null
            const newContent = { measurement: measurement, model: action.model, svgNode: svgNode }
            return {
                ...state,
                view: naturalFit({ ...state, content: newContent }),
                content: { measurement: measurement, model: action.model, svgNode: svgNode }
            }
        case 'TOGGLE_FIT_SCREEN':
            const newFitOnScreen = !state.options.fitOnScreen
            return {
                content: state.content,
                options: { ...state.options, fitOnScreen: newFitOnScreen },
                view: newFitOnScreen ? screenFit(state) : naturalFit(state),
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
        case 'SET_VIEW_MEASUREMENTS':
            return {
                ...state,
                view: { ...state.view, viewOffset: action.point, viewSize: action.size }
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
                content: state.content,
                options: newOptions,
                view: { ...state.view, scale: newScale, panOffset: p.add(view.panOffset, centerPointDiff) }
            }
        case 'MOUSE_DOWN':
            return { ...state, view: { ...state.view, isMouseDown: true } }
        case 'MOUSE_UP':
            return { ...state, view: { ...state.view, isMouseDown: false } }
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