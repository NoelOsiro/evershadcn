// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"
import { Adapter, AdapterUser } from 'next-auth/adapters';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SupabaseAdapter as SupabaseAdapterOriginal } from '@auth/supabase-adapter';

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image: string
    }
    
  }
}

// types/next-auth.d.ts


declare module '@auth/supabase-adapter' {
  export interface SupabaseAdapter extends Adapter {
    createUser(user: Omit<AdapterUser, 'id'>): Promise<AdapterUser>;
  }
}
