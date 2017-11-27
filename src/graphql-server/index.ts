import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import * as bodyParser from 'body-parser'
import { makeExecutableSchema } from 'graphql-tools'
import { makeUser } from '../components/user'

export const makeGraphqlServer = ({ connectors, server }) => {
  const user = makeUser({ connectors })

  const typeDefs = [user.typeDefs]

  const resolvers = {
    ...user.resolvers,
  }

  const schema = makeExecutableSchema({
    allowUndefinedInResolve: false,
    resolvers,
    typeDefs,
  })

  server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
  server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
}
