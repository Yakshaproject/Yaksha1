import React, { useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../apiClient.js"


const AppContext = React.createContext();

export const AppContextProvider = ({
    children,
}) => {
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
    });

    return (
        <AppContext.Provider
        value={{
            isLoogedIn: !isError
        }}
        >
            {children}
        </AppContext.Provider>
    )

}

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
}