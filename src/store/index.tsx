import * as React from 'react';
import { useEffect, createContext, useReducer, FunctionComponent} from 'react';
import * as makerjs from 'makerjs'

import reducer from './reducer'
import { ActionType } from './actions'
import { initialState, OptionState } from './state'

const store = createContext(initialState);
const dispatchStore: React.Context<React.Dispatch<ActionType>> = createContext({}) as any 

type ProviderProps = { 
    options?: OptionState 
    model?: makerjs.IModel | string
}

const StateProvider: FunctionComponent<ProviderProps> = ({ options, model, children }) => {
    const firstState = options ? { ...initialState, view: initialState.view } : initialState
    const [state, dispatch] = useReducer(reducer, firstState);

    useEffect(() => {
        dispatch({ type: 'STORE_MODEL', model: model ? model : null })
    }, [model])

    return <store.Provider value={state}>
        <dispatchStore.Provider value={dispatch}>
            {children}
        </dispatchStore.Provider>
    </store.Provider>;
};

export { store, dispatchStore, StateProvider }
