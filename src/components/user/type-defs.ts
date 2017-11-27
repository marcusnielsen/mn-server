export const typeDefs = `
type User {
  id: Int!
  email: String
  createdAt: String
}

type Query {
  users: [User]
  profile(id: Int!): User
}

type Mutation {
  createUser (
    email: String!
  ): User
}
`
