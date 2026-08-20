const API_URL = import.meta.env.VITE_API_URL;
export async function refreshToken(){
    const respone = await fetch(`${API_URL}/api/auth/refresh-token`, {
        method : "POST",
        credentials : "include"
    });

    const data = await respone.json();

    if(!respone.ok){
        console.error("Error during refresh token:", data.error);
        return;
    }
    return data.accessToken;
}

export async function logout(){
    const respone = await fetch(`${API_URL}/api/auth/logout`, {
        method : "POST",
        credentials : "include"
    });

    const data = await respone.json();

    if(!respone.ok){
        console.error("Error during logout:", data.error);
        return;
    }
    localStorage.removeItem("token");

}

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            username,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Login failed");
    }

    localStorage.setItem("token", data.accessToken);

    return data;
};

export const signup = async (username, email, password) => {
    const response = await fetch(`${API_URL}/api/auth/register`, 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Signup failed");
    }

    return {
        response,
        data
    };
};