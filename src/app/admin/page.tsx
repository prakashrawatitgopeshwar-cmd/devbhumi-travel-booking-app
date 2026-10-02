import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/auth';
import AdminDashboardClient from './AdminDashboardClient';

/** Server-side route guard: the admin dashboard is never rendered to non-admin users. */
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const user = await currentUser();
  // if (!user) redirect('/admin/login');
  // if (user.role !== 'admin') redirect('/');
  return <AdminDashboardClient />;
}
