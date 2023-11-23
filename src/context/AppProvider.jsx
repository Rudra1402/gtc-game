import { useState, useEffect } from "react";
import AppContext from "./AppContext";

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isDark, setIsDark] = useState(true);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    }, [])
    return (
        <AppContext.Provider value={{ user, setUser, isDark, setIsDark }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider