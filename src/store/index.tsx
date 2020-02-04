import * as React from 'react';
import {createContext, useReducer, FunctionComponent} from 'react';

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
const { Provider } = store;

type ProviderProps = {}

const StateProvider: FunctionComponent<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer((state: RootState, action: any) => {
        switch (action.type) {
            case 'action description':
                const newState = state
                return newState;
            default:
                throw new Error();
        };
    }, initialState);

    const value: any = { state, dispatch }
    return <Provider value={value}>{children}</Provider>;
};

export { store, StateProvider }
