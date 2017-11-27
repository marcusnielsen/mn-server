const users = [
  { id: 1, email: 'test1@example.com' },
  { id: 2, email: 'test2@example.com' },
]

let index = 3

export const makeResolvers = ({ model }) => ({
  Mutation: {
    createUser: (_, { email }) => {
      const user = { id: index, email }
      index += 1
      users.push(user)
      return user
    },
  },
  Query: {
    profile: (_, { id }) => model.getProfile({ id }),
    users: () => model.getUsers(),
  },
})
