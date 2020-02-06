import * as React from 'react';
import {createContext, useReducer, FunctionComponent} from 'react';
import reducer from './reducer'
import { ActionType } from './actions'
import { initialState, OptionState } from './state'

const store = createContext(initialState);
const dispatchStore: React.Context<React.Dispatch<ActionType>> = createContext({}) as any 

type ProviderProps = { options?: OptionState }

const StateProvider: FunctionComponent<ProviderProps> = ({ options, children }) => {
    const firstState = options ? { options: options, view: initialState.view } : initialState
    const [state, dispatch] = useReducer(reducer, firstState);

    return <store.Provider value={state}>
        <dispatchStore.Provider value={dispatch}>
            {children}
        </dispatchStore.Provider>
    </store.Provider>;
};

export { store, dispatchStore, StateProvider }
