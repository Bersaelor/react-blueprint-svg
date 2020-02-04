
import { RootState } from './store/state';

export function getGridScale(state: RootState): number {
    var gridScale = 1;

    while (state.view.zoom * gridScale < 6) {
        gridScale *= 10;
    }

    while (state.view.zoom * gridScale > 60) {
        gridScale /= 10;
    }

    return gridScale * 10 * state.view.zoom;
}