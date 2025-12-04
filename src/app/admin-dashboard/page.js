import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { logoutAdmin } from '../actions/auth'
import DashboardContent from '@/components/Admin/DashboardContent'

export const metadata = {
    title: "Admin Dashboard - Skill Conquest",
    description: "Manage students, view reports, and oversee platform activity.",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function AdminDashboard() {
    const cookieStore = await cookies()
    const isAdmin = cookieStore.get('admin_session')

    if (!isAdmin) {
        redirect('/admin-Login')
    }

    return <DashboardContent logoutAction={logoutAdmin} />
}
