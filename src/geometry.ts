
import * as makerjs from 'makerjs'
import { ViewState } from './store/state';

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