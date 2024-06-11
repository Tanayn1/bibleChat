'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'
import { serviceSupabase } from '../../../utils/supabase/service'

export async function login(email : string, password : string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });
  if (error) {
    console.log(error)
    return { error: 'Invalid Login'}
  }

  return { error: null }
}

export async function signup(name : string, email : string, password : string, confirmPassword : string ) {
  const supabase = createClient()
    if (password === confirmPassword) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  })

  if (error) {
    console.log(error)
   
  }

  const { user } = data;
  const userId = user?.id;
  const response = await supabase.from('users').insert({
    id: userId,
    email: email,
    name: name,
    plan: 'free'

  });
  console.log(response.data);
  console.log(response.error);
  redirect('/auth/signup/verifyEmail')
 } else {
    alert('passwords do not match')
 }
}



export async function signUpWithGoogle() {
  const supabase = createClient()

  const { data , error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo:`https://holy-harmony.vercel.app/auth/callback`,
      
    }
  })

 if (error) {
   console.log(error)
   return {error: 'Internal Server Error'}
 }
 console.log(data)
  if (data) {
    console.log(data)
    redirect(data.url)
  }
}