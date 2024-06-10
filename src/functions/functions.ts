
export async function checkChatNum(supabase : any) {
    const userID = (await supabase.auth.getUser()).data.user?.id;
    const { data, error } : any = await supabase
    .from('users')
    .select('*')
    .eq('id', userID);
    if (error) console.log(error);
    const userPlan = data[0]?.plan;
    if (userPlan === 'pro') {
        return false;
    } else {
        const chats = await supabase
        .from('chatSessions')
        .select('*')
        .eq('user_id', userID)
        console.log(chats.data?.length)
        if (chats.error) console.log(error);
        if (chats.data && chats.data?.length >= 5) {
            return true
        } else {
            return false
        }
    }
}


export async function isPlanFree(supabase : any) {
    const userID = (await supabase.auth.getUser()).data.user?.id;
    const { data, error } : any = await supabase
    .from('users')
    .select('*')
    .eq('id', userID);
    if (error) console.log(error);
    const userPlan = data[0].plan;
    console.log(data)
    console.log(userPlan)
    if (userPlan === 'pro') {
        return false;
    } else {
        return true
    }
}