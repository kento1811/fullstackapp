import "./Search.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileMinimal from "../../components/page components/profileMinimal.jsx";
import Sidebar from "../../components/page components/sidebar.jsx";
import SearchFunc from "../../components/utilities/search.jsx";

export default function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    async function handleSearchResult(data) {
        setSearchResults(data.data);
    }

    return (
        <div id="search">
            <Sidebar activePage="Search"/>
            <div id="search_body">
                <div id = "searchFunc">
                    <SearchFunc onSearchResult={handleSearchResult}/>
                </div>
                <div id = "searchResults">
                    {searchResults ? (
                        searchResults.map((profile) => (
                            <ProfileMinimal key={profile.id} profile={profile} onClick={() => navigate(`/profile/${profile.profile_id}`)} />
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            </div>
        </div>
    )
}