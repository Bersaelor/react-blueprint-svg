
import * as makerjs from 'makerjs'
import { RootState, ViewState } from './store/state';

const pixelsPerInch = 96
let p = makerjs.point

export function getGridScale(view: ViewState): number {
    var gridScale = 1;

    while (view.scale * gridScale < 6) gridScale *= 10;

    while (view.scale * gridScale > 60) gridScale /= 10;

    return gridScale * 10 * view.scale;
}

export function getCursorCoordinates(view: ViewState): makerjs.IPoint {
    const position = p.subtract(view.cursor, view.panOffset)
    return p.scale(position, 1 / view.scale)
}

export function naturalFit(state: RootState): ViewState {
    var view = { ...state.view }
    if ( !state.content.measurement ) {
        view.panOffset = p.scale(view.viewSize, 0.5)
        return view
    }

    view.scale = 1
    view.panOffset = [0, 0]
    if (state.content.model && state.content.model.units) {
        //convert from units to Inch
        view.scale = makerjs.units.conversionScale(state.content.model.units, makerjs.unitType.Inch);
        //from inch to pixel
        view.scale *= pixelsPerInch;
    }
    view.panOffset = p.scale(view.viewSize, 0.5)

    return view
}

export function screenFit(state: RootState): ViewState {
    var view = { ...state.view }
    if ( !state.content.measurement ) {
        view.panOffset = p.scale(view.viewSize, 0.5)
        return view
    }

    const naturalSize = getNaturalSize(state.content.measurement)
    const scaleHeight = view.viewSize[1] / naturalSize[1]
    const scaleWidth = view.viewSize[0] / naturalSize[0]
    view.scale = 0.9 * Math.min(scaleWidth, scaleHeight)
    const middle = p.scale(view.viewSize, 0.5)
    view.panOffset = p.add(middle, p.scale([
        -(naturalSize[0] / 2 + state.content.measurement.low[0]),
        (naturalSize[1] / 2 + state.content.measurement.low[1])
    ], view.scale))

    return view
}

export function getNaturalSize(measure: makerjs.IMeasureWithCenter) {
    return [measure.width, measure.height]
}

export function renderOptions(view: ViewState, measurement: makerjs.IMeasureWithCenter | null) {
    var fontSize = 2
    var flowSize = 2
    if (measurement) {
        const size = getNaturalSize(measurement)
        const minSize = Math.min(size[0], size[1])
        fontSize = 1 / 25 * minSize
        flowSize = 1 / 100 * minSize
    }

    return {
        origin: view.origin,
        annotate: true,
        flow: { size: flowSize },
        svgAttrs: { "id": 'drawing' },
        fontSize: fontSize + 'px',
        useSvgPathOnly: false
    }
}