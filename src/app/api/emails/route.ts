import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { serviceSupabase } from '../../../../utils/supabase/service';
import DailyPrayerEmailTemplate from '@/components/resend/dailyPrayerEmailTemp';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(req: Request, res: Response) {
    const supabase = serviceSupabase();
    try {
        const { data: emailListData, error: emailListError} = await supabase
        .from('email_notifications')
        .select('*')
        .eq('timezone', 'est') 
        if (emailListError) return NextResponse.json({status: 400, error: 'Could not fetch emails'});
        if (emailListData.length <= 0) return NextResponse.json({status: 200, response: 'Email List Is Empty'})
        const emailList : any = [];
        emailListData.forEach((user)=>{
            emailList.push({
                name: user.display_name,
                email: user.email,
            });
        });
        emailList.forEach(async ({name, email} : {name : string, email : string})=>{
            const { data, error } = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: [email],
                subject: 'Daily Prayer',
                react: DailyPrayerEmailTemplate({name: name}),
            }) ;
            if (error) {
                return NextResponse.json({status: 500, error: error})
            }
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json(error)
    }
}