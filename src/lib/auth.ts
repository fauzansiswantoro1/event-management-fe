import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(user) {
        if (user) {
          return {
            name: user.name as string,
            email: user.email as string,
            avatar: user.avatar as string,
            userToken: user.userToken as string,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour in second
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.avatar = user.avatar;
        token.userToken = user.userToken;
      }
      return token;
    },
    async session({ token, session }) {
      session.user = {
        ...session.user,
        name: token.name as string,
        email: token.email as string,
        avatar: token.avatar as string,
      };
      session.userToken = token.userToken as string;
      return session;
    },
  },
});
