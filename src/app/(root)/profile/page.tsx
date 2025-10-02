import { authSessionServer } from '@/lib/auth';
import { redirect } from 'next/navigation';

async function page() {
  const userData = await authSessionServer();
  if (userData) {
    redirect(`/profile/${userData.user.username}`);
  }
  redirect('/auth/sign-in');
}

export default page;
