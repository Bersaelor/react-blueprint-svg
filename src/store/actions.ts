export type ActionType =
   | { type: 'MOUSE_WHEEL', delta: number }
   | { type: 'TOGGLE_FIT_SCREEN' }  
   | { type: 'TOGGLE_GRID' }  
   | { type: 'TOGGLE_PATH_NAMES' }  
   | { type: 'TOGGLE_PATH_FLOW' }  
   | { type: 'TOGGLE_PATH_FLOW' }  
   | { type: 'CLICK_DOWN', point: number[] }
   | { type: 'MOUSE_MOVE', event: React.MouseEvent<HTMLDivElement, MouseEvent> }

/*
 * action creators
 */