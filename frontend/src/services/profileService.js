import { apiFetch } from "./api";

const API_URL = import.meta.env.VITE_API_URL;

export async function getProfile(profile_id = "me") {
    const response = await apiFetch(
        `${API_URL}/profile/${profile_id}`,
        {
            method: "GET"
        }
    )

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.error || "Get Profile failed");
    }

    return {response, data};
}

export async function findProfile(query) {

    if(query.length < 3){
        return {response: null, data: []};
    }

    const response = await apiFetch(
        `${API_URL}/profile/search?query=${encodeURIComponent(query)}`,
        {
            method: "GET"
        }
    )

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.error || "Find Profile failed");
    }

    return {response, data};
}
