export const makeResolvers = ({ model }) => ({
  Mutation: {
    createUser: (_, { email }) => model.createUser({ email }),
  },
  Query: {
    profile: (_, { id }) => model.getUserProfile({ id }),
    users: () => model.getUsers(),
  },
})
