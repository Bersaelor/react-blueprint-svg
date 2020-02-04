import * as React from 'react';
import {createContext, useReducer, FunctionComponent} from 'react';
import reducer from './reducer'
import { ActionType } from './actions'
import { initialState } from './state'

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
