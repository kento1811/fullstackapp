import supabase from "../config/supabase.js";

export async function getProfile(req,res){
    let id = req.params.profile_id;
    console.log(id);
    if(!id){
        return res.status(401).json({
            error: "require profile id"
        })
    }
    try{
        let data, error;
        if(id == "me"){
            id = req.user.id;
            console.log(id);
            ({data, error} = await supabase
            .from("profile")
            .select(`
                avatar_url,
                quote,
                is_male,
                name,
                profile_id,
                date_of_birth
                `)
            .eq("user_id", id)
            .single());
        } else {
            ({data, error} = await supabase
            .from("profile")
            .select(`
                avatar_url,
                quote,
                is_male,
                name,
                profile_id,
                date_of_birth
                `)
            .eq("profile_id", id)
            .single());
        }
        if(error){
            console.error("error during get Profile");
            return res.status(401).json({
                error
            });
        }

        if(!data){
            console.error("There is no profile");
            return res.status(401).json({
                error: "there is no profile"
            });
        }

        return res.status(200).json({
            data
        });
    }
    catch(e){
        console.error(e);
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}