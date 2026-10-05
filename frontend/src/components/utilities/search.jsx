import "./search.css"
import { useState , useEffect} from "react";
import {findProfile} from "../../services/profileService.js";

export default function SearchFunc({ onSearchResult }) {
    const [searchText, setSearchText] = useState("");

    async function handleSearch() {
        try {
            const response = await findProfile(searchText);
            onSearchResult(response.data);
            console.log("success find profile");
        } catch (error) {
            console.error(error);
        }
    }

    function handleSubmit(e) {
    e.preventDefault();
    handleSearch();
    }

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    }   

    useEffect(() => {
    const timer = setTimeout(() => {
        handleSearch();
    }, 500);

    return () => clearTimeout(timer);
    }, [searchText]);

    return (
        <div id = "searchFunc">
            <form action="" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchText}
                    onChange={handleInputChange}
                />
                <button type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
    )
}