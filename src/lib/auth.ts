// // src/lib/auth.ts
// import NextAuth, { type DefaultSession } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import { prisma } from "./db"

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//       role: string
//     } & DefaultSession["user"]
//   }

//   interface User {
//     role: string
//   }
// }

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       // Check if user exists in database
//       const dbUser = await prisma.user.findUnique({
//         where: { email: user.email! },
//       })

//       // If user doesn't exist, create them with STUDENT role
//       if (!dbUser) {
//         await prisma.user.create({
//           data: {
//             email: user.email!,
//             name: user.name!,
//             role: "STUDENT",
//           },
//         })
//       }

//       return true
//     },
//     async jwt({ token, user, account, profile }) {
//       if (user) {
//         // Add role information from database
//         const dbUser = await prisma.user.findUnique({
//           where: { email: user.email! },
//         })
//         token.role = dbUser?.role || "STUDENT"
//         token.id = dbUser?.id
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.role = token.role as string
//         session.user.id = token.id as string
//       }
//       return session
//     },
//   },
// })