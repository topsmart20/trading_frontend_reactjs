import React, { createContext, useReducer, useCallback } from 'react';
import { useAuthentication } from '../Hooks/useAuthentication';
import { tradeReducer } from '../Reducers/tradeReducer';

export const CurrentTradesContext = createContext();
export const AuthContext = createContext();

export const MainContextProvider = (props) => {
    const [currentTrades, dispatchCurrentTrades] = useReducer(tradeReducer, []);
    const { token, user, login, logout, addAccount, removeAccount } = useAuthentication();

    const dispatch = useCallback((action) => {
        dispatchCurrentTrades(action);
    });

    return (
        <CurrentTradesContext.Provider value={{ currentTrades, dispatch }}>
            <AuthContext.Provider value={{ token, user, login, logout, addAccount, removeAccount }}>
                {props.children}
            </AuthContext.Provider>
        </CurrentTradesContext.Provider>
    );
};

export default MainContextProvider;
