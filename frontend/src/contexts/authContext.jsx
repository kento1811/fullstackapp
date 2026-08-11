import { createContext, useContext, useState, useEffect } from "react";

import {apiFetch} from "../services/api.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        async function loadUser() {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await apiFetch("http://localhost:3000/api/auth/me");

                if (!response.ok) {
                    localStorage.removeItem("token");
                    console.error("Error fetching user:", data.error);
                    setUser(null);
                    return;
                } 
                const data = await response.json();


                setUser(data.user);
                
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}