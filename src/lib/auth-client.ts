import { createAuthClient } from 'better-auth/react';
import { multiSessionClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  fetchOptions: {
    credentials: 'include',
  },
  plugins: [multiSessionClient()],
});

export const { signIn, signOut, useSession } = authClient;
