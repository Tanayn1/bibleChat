'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'

export async function login(email : string, password : string) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: email,
    password: password
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    alert(error)
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}

export async function signup(email : string, password : string, confirmPassword : string ) {
  const supabase = createClient()
    if (password === confirmPassword) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: email,
    password: password
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    alert(error)
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
 } else {
    alert('passwords do not match')
 }
}