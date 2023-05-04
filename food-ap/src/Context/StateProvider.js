import React, {useContext, createContext , useReducer} from "react";

export const StateContext = createContext()
export const StateProvider = ({reduser, initialState, children})=>(

    <StateContext.Provider value = {useReducer(reduser,initialState)}>
        {children}
    </StateContext.Provider>
)

export const UseStatevalue = () => useContext(StateContext)


