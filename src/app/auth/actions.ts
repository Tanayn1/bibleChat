'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'

export async function login(email : string, password : string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });
  if (error) {
    alert(error)
    return;
  }


  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
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
    alert(error)
    return;
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
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
 } else {
    alert('passwords do not match')
 }
}