import supabase from "../config/supabase.js";

export async function getProfile(req,res){
    let id = req.params.profile_id;
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

export async function updateProfile(req, res) {
    try {
        const id = req.user.id;
        console.log(req.body);
        const { avatar_url, quote, is_male, name, date_of_birth } = req.body ?? {};
        const updates = {};

            if (avatar_url != null) updates.avatar_url = avatar_url;
            if (quote != null) updates.quote = quote;
            if (is_male != null) updates.is_male = is_male;
            if (name != null) updates.name = name;
            if (date_of_birth != null) updates.date_of_birth = date_of_birth;
            
        const { data, error } = await supabase
        .from("profile")
        .update(updates)
        .eq("user_id", req.user.id)
        .select()
        .single();

        if (error) {
            console.error("Error during update Profile:", error);
            return res.status(400).json({ error });
        }

        if (!data) {
            return res.status(404).json({
                error: "There is no profile"
            });
        }

        return res.status(200).json({ data });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}


export async function findProfile(req,res){
    try{
        const q = req.query.query?.trim() || "";
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