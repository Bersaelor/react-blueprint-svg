import * as makerjs from 'makerjs'

export type ActionType =
   | { type: 'STORE_MODEL', model: makerjs.IModel | null }
   | { type: 'TOGGLE_FIT_SCREEN' }  
   | { type: 'TOGGLE_GRID' }  
   | { type: 'TOGGLE_PATH_NAMES' }  
   | { type: 'TOGGLE_PATH_FLOW' }  
   | { type: 'SET_VIEW_MEASUREMENTS', point: number[], size: number[] }
   | { type: 'MOUSE_WHEEL', delta: number }
   | { type: 'MOUSE_MOVE', point: number[] }
   | { type: 'MOUSE_DOWN' }
   | { type: 'MOUSE_UP' }   

/*
 * action creators
 */