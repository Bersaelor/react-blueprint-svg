export type ActionType =
   | { type: 'TOGGLE_FIT_SCREEN' }  
   | { type: 'TOGGLE_GRID' }  
   | { type: 'TOGGLE_PATH_NAMES' }  
   | { type: 'TOGGLE_PATH_FLOW' }  
   | { type: 'SET_VIEW_OFFSET', point: number[] }
   | { type: 'MOUSE_WHEEL', delta: number }
   | { type: 'MOUSE_MOVE', point: number[] }
   | { type: 'MOUSE_DOWN' }
   | { type: 'MOUSE_UP' }

/*
 * action creators
 */