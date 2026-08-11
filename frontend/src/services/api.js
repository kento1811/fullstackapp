import {refreshToken} from "./authService.js";

export async function apiFetch(url, options = {}) {
    const token = localStorage.getItem("token");

    let response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    if(response.status === 401 || response.status === 403){
        try{
            const newAccessToken = await refreshToken();
            localStorage.setItem("token", newAccessToken);

            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    "Authorization": `Bearer ${newAccessToken}`,
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
        } catch(error){
            console.error("Error during token refresh:", error);
            localStorage.removeItem("token");
            throw error;
        }
    }

    return response;
}   