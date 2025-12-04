'use server'
 
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
export async function loginAdmin(prevState, formData) {
  const username = formData.get('username')
  const password = formData.get('password')
 
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })
    redirect('/admin-dashboard')
  } else {
    return { message: 'Invalid credentials' }
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/admin-Login')
}
