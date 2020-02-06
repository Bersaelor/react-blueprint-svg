
import * as makerjs from 'makerjs'
import { RootState, ViewState } from './store/state';

export function getGridScale(view: ViewState): number {
    var gridScale = 1;

    while (view.scale * gridScale < 6) gridScale *= 10;

    while (view.scale * gridScale > 60) gridScale /= 10;

    return gridScale * 10 * view.scale;
}

export function getCursorCoordinates(view: ViewState): makerjs.IPoint {
    const position = makerjs.point.subtract(view.cursor, view.panOffset)
    return makerjs.point.scale(position, 1 / view.scale)
}

export function naturalFit(state: RootState): ViewState {
    var view = { ...state.view }
    const halfWidth = view.viewSize[0] / 2

    view.scale = 1
    view.panOffset = [halfWidth, 0]

    return state.view
}


export function screenFit(state: RootState): ViewState {
    var view = { ...state.view }

    view.scale = 2
    view.panOffset = [20, 20]

    return view
}