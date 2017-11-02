import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import * as bodyParser from 'body-parser'
import { makeExecutableSchema } from 'graphql-tools'

export const makeGraphqlServer = ({ server }) => {
  const typeDefs = [
    `
      type Query {
        hello: String
      }

      schema {
        query: Query
    }`,
  ]

  const resolvers = {
    Query: {
      hello(root) {
        return 'world'
      },
    },
  }

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
  server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
}
