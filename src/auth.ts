import { SupabaseAdapter } from "@auth/supabase-adapter"
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	adapter: SupabaseAdapter({
		url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
		secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
	}),
	callbacks: {
		async session({ session, user }) {
			const signingSecret = process.env.SUPABASE_JWT_SECRET
			if (signingSecret) {
				const payload = {
					aud: "authenticated",
					exp: Math.floor(new Date(session.expires).getTime() / 1000),
					sub: user.id,
					email: user.email,
					role: "authenticated",
				}
				session.supabaseAccessToken = jwt.sign(payload, signingSecret)
			}
			return session
		},
	},
	
})