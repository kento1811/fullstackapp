import "./ProfileComponent.css";
import { useEffect, useState } from "react";
import { useConversation } from "../../contexts/conversationContext.jsx";
import Loading from "./Loading.jsx";

export default function ProfileComponent({profile_id = "me"}){
    const [profileTarget,setProfileTarget] = useState(null);
    const [loading,setLoading] = useState(true);
    const { profile,loadProfile } = useConversation();

    async function Profiles(profile_id){
        try{
            setLoading(true);
            if (profile_id === "me"){
                await setProfileTarget(profile);
                setLoading(false);
                return;
            }
            const data = await loadProfile(profile_id);
            setProfileTarget(data);
            setLoading(false);
            return;
        } catch(e){
            setLoading(false);
            console.log("error while get Profile", e);
            setProfileTarget(null);
            return;
        }
    }

    useEffect(() => {
        Profiles(profile_id);
    },[profile_id, profile]);


    return (
        <div style={{width : "100%", height: "100vh"}}>
            {loading ? 
            <div style={{display : "flex", justifyContent : "center", alignItems: "center", height: "100vh"}}>
                <Loading></Loading>
            </div>
            :
            <div id = "profile-component">
                <div id="avatar">
                    <img src={profileTarget?.avatar_url} alt="avatar" />
                </div>
                <div id="information">
                    <p id="name"> {profileTarget?.name ? profileTarget.name : "guest"}</p>
                    <p id="quote">{profileTarget?.quote}</p>
                    <p id="date-of-birth">{profileTarget?.date_of_birth}</p>
                    <p id="gender">{profileTarget?.is_male ? "male" : "female"}</p>
                </div>
                <div id="images"></div>
            </div>}
        </div>
    );
}