import "./ProfileComponent.css";
import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService.js";
import Loading from "./Loading.jsx";

export default function ProfileComponent({profile_id = "me"}){
    const [profile,setProfile] = useState(null);
    const [loading,setLoading] = useState(true);
    async function Profiles(profile_id){
        try{
            setLoading(true);
            const {response, data} = await getProfile(profile_id);
            setProfile(data.data);
            console.log(data.data);
            setLoading(false);
        } catch(e){
            setLoading(false);
            console.log("error while get Profile");
            setProfile(null);
            return;
        }
    }

    useEffect(() => {
        Profiles(profile_id);
    },[profile_id]);


    return (
        <div style={{width : "100%", height: "100vh"}}>
            {loading ? 
            <div style={{display : "flex", justifyContent : "center", alignItems: "center", height: "100vh"}}>
                <Loading></Loading>
            </div>
            :
            <div id = "profile-component">
                <div id="avatar">
                    <img src={profile.avatar_url} alt="avatar" />
                </div>
                <div id="information">
                    <p id="name"> {profile.name ? profile.name : "guest"}</p>
                    <p id="quote">{profile.quote}</p>
                    <p id="date-of-birth">{profile.date_of_birth}</p>
                    <p id="gender">{profile.is_male ? "male" : "female"}</p>
                </div>
                <div id="images"></div>
            </div>}
        </div>
    );
}