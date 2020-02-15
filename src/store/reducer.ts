import * as makerjs from 'makerjs'
import convert from 'react-from-dom';

import { ActionType } from './actions'
import { RootState, SVGProps } from './state'
import { getCursorCoordinates, naturalFit, screenFit, renderOptions } from '../geometry'

const wheelZoomDelta = 0.1
const p = makerjs.point

function isMakerModel(object: string | makerjs.IModel): object is makerjs.IModel {
    return (object as makerjs.IModel).paths !== undefined || (object as makerjs.IModel).models !== undefined
}

export default (state: RootState, action: ActionType) => {
    const { view } = state

    switch (action.type) {
        case 'STORE_MODEL':
            const model = action.model
            var svgString: string | null = null
            if (model && isMakerModel(model)) {
                svgString = makerjs.exporter.toSVG(model, renderOptions(view, makerjs.measure.modelExtents(model)))
            } else if (model && typeof model === "string") {
                svgString = model
            }
            const svgNode = svgString ? convert(svgString) as React.ReactElement<SVGProps, any> : null
            const measurement = model && isMakerModel(model) ? makerjs.measure.modelExtents(model) : null
            const newContent = { 
                measurement: measurement,
                model: model && isMakerModel(model) ? model : null, 
                svgNode: svgNode 
            }
            const fittingState = { ...state, content: newContent }
            return {
                ...state,
                view: state.options.fitOnScreen ? screenFit(fittingState) : naturalFit(fittingState),
                content: newContent
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
            const sign = action.delta > 0 ? -1 : 1
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
        case 'MOUSE_DOWN': {
            const newCursor = p.subtract(action.point, view.viewOffset)
            return { ...state, view: { ...state.view, isMouseDown: true, cursor: newCursor } }
        }
        case 'MOUSE_UP': {
            const newCursor = p.subtract(action.point, view.viewOffset)
            return { ...state, view: { ...state.view, isMouseDown: false, cursor: newCursor } }
        }
        case 'MOUSE_MOVE':
            const newCursor = p.subtract(action.point, view.viewOffset)
            // console.log(`viewOffset: ${view.viewOffset}, newCursor: ${newCursor}`)
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