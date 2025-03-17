import { ApolloServer, gql } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String!
  }

  type Query {
    users: [User]
    me: User
  }

  type LoginResponse {
    token: String
    user: User
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): String
    login(email: String!, password: String!): LoginResponse!
  }
`;

const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),

    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await prisma.user.findUnique({ where: { id: user.userId } });
    },
  },

  Mutation: {
    register: async (_, { name, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      return "User registered successfully!";
    },

    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      
      return { 
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      };
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, JWT_SECRET);
        return { user };
      } catch (error) {
        console.error("JWT Verification Error:", error.message);
      }
    }
    return {};
  },
});

let serverStarted = false;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (!serverStarted) {
    await apolloServer.start();
    serverStarted = true;
  }
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}