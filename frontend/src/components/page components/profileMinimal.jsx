import "./profileMinimal.css";

export default function ProfileMinimal({ profile , onClick}) {
    
    return (
        <div className="profile-minimal" onClick={onClick}>
            <div className="profile-minimal-header">
                <img src={profile.avatar_url} alt="Avatar" className="profile-minimal-avatar" />
                <h2 className="profile-minimal-name">{profile.name}</h2>
            </div>
        </div>
    );
}