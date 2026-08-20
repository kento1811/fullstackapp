import { createContext, useContext, useState, useEffect } from "react";

import {apiFetch} from "../services/api.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [socket,setSocket] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL;

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
                const response = await apiFetch(`${API_URL}/api/auth/me`);
                const data = await response.json();
                if (!response.ok) {
                    localStorage.removeItem("token");
                    console.error("Error fetching user:", data.error);
                    setUser(null);
                    return;
                } 


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

    useEffect(() => {

        if (!user) {
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        const ws = new WebSocket(
            `ws://localhost:3000?token=${token}`
        );

        ws.onopen = () => {
            console.log("WebSocket connected");
            setSocket(ws);
        };

        ws.onmessage = (event) => {

            const data = JSON.parse(event.data);

            console.log("WebSocket message:", data);

        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
            setSocket(null);
        };

        return () => {
            ws.close();
        };

    }, [user]);

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
                socket,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}