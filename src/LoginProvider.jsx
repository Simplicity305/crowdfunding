import { createContext, useState } from "react"

export const LoginContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const loggedIn = !!token;
    return <LoginContext.Provider value={{ loggedIn, token, setToken }}>
        {children}
    </LoginContext.Provider>
}

// Using context to avoid having to pass props around for log in