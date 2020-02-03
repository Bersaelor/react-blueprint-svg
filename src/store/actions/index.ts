/*
 * action types
 */
export const MOUSE_WHEEL = 'MOUSE_WHEEL'
export const TOGGLE_FIT_SCREEN = 'TOGGLE_FIT_SCREEN'
export const TOGGLE_GRID = 'TOGGLE_GRID'
export const TOGGLE_PATH_NAMES = 'TOGGLE_PATH_NAMES'
export const TOGGLE_PATH_FLOW = 'TOGGLE_PATH_FLOW'


/*
 * action creators
 */
export function onMouseWheel(delta: number) {
    return { type: MOUSE_WHEEL, delta }
}

export function toggleFitScreen() {
    return { type: TOGGLE_FIT_SCREEN }
}

export function toggleGrid() {
    return { type: TOGGLE_GRID }
}

export function togglePathNames() {
    return { type: TOGGLE_PATH_NAMES }
}

export function togglePathFlow() {
    return { type: TOGGLE_PATH_FLOW }
}
