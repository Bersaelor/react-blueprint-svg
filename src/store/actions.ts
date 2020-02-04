export type ActionType =
   | { type: 'MOUSE_WHEEL', delta: number }
   | { type: 'TOGGLE_FIT_SCREEN' }  
   | { type: 'TOGGLE_GRID' }  
   | { type: 'TOGGLE_PATH_NAMES' }  
   | { type: 'TOGGLE_PATH_FLOW' }  
   | { type: 'TOGGLE_PATH_FLOW' }  
   | { type: 'CLICK_DOWN', x: number, y: number }

/*
 * action creators
 */
export function onMouseWheel(delta: number): ActionType {
    return { type: 'MOUSE_WHEEL', delta }
}

export function toggleFitScreen(): ActionType {
    return { type: 'TOGGLE_FIT_SCREEN' }
}

export function toggleGrid(): ActionType {
    return { type: 'TOGGLE_GRID' }
}

export function togglePathNames(): ActionType {
    return { type: 'TOGGLE_PATH_NAMES' }
}

export function togglePathFlow(): ActionType {
    return { type: 'TOGGLE_PATH_FLOW' }
}
