export async function refreshToken(req, res){
    const respone = await fetch("http://localhost:3000/api/auth/refresh-token", {
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
    const respone = await fetch("http://localhost:3000/api/auth/logout", {
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