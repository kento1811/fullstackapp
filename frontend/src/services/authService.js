export async function refreshToken(req, res){
    const API_URL = import.meta.env.VITE_API_URL;
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
    const API_URL = import.meta.env.VITE_API_URL;
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