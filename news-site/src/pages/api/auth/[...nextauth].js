import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { gql } from "@apollo/client";
import client from "../../lib/apollo-client";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await client.mutate({
            mutation: gql`
              mutation Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                  token
                  user {
                    id
                    name
                    email
                  }
                }
              }
            `,
            variables: {
              email: credentials.email,
              password: credentials.password,
            },
          });

          const { token, user } = data.login;

          if (token && user) {
            
            return {
              ...user,
              token, 
            };
          }

          return null;
        } catch (error) {
          console.error("Apollo Client Error:", JSON.stringify(error, null, 2));
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.name = user.name; 
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.name = token.name; 
      session.user.email = token.email; 
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
