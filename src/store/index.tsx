import * as React from 'react';
import {createContext, useReducer, FunctionComponent} from 'react';
import reducer from './reducer'
import { ActionType } from './actions'

export type IOptions = {
    fitOnScreen: boolean
    showGrid: boolean
    showPathNames: boolean
    showPathFlow: boolean
}

export type RootState = {
    options: IOptions
    view: typeof initialView
}

const initialOptions: IOptions = {
    fitOnScreen: false,
    showGrid: true,
    showPathNames: false,
    showPathFlow: false,
}

const initialView = {
    zoom: 1
}

const initialState: RootState = {
    options: initialOptions,
    view: initialView
}

const store = createContext(initialState);
const dispatchStore: React.Context<React.Dispatch<ActionType>> = createContext({}) as any 

type ProviderProps = {}

const StateProvider: FunctionComponent<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <store.Provider value={state}>
        <dispatchStore.Provider value={dispatch}>
            {children}
        </dispatchStore.Provider>
    </store.Provider>;
};

export { store, dispatchStore, StateProvider }
