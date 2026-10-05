import supabase from "../config/supabase.js";

export async function getProfile(req,res){
    let id = req.params.profile_id;
    console.log("profile id: ",id);
    if(!id){
        return res.status(401).json({
            error: "require profile id"
        })
    }
    try{
        let data, error;
        if(id == "me"){
            id = req.user.id;
            
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
            console.log("fuck you");
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

export async function findProfile(req,res){
    try{
        const q = req.query.query?.trim() || "";
        console.log(q);
        if(q.length < 2){
            return res.status(200).json({data : []});
        }

        const {data , error} = await supabase
        .rpc("search_profiles", { search_text: q });
        if (error) {
            console.error("Supabase Query Error:", error);
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ data });

    } catch(error){
        console.error(error);
        return res.status(500).json({
            error: "internal server error"
        })
    }
}