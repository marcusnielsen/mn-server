import { makeModel } from './model'
import { makeResolvers } from './resolvers'
import { typeDefs } from './type-defs'

export const makeUser = ({ connectors }) => {
  const { dbConnector: connector } = connectors

  const model = makeModel({ connector })
  return {
    model,
    resolvers: makeResolvers({ model }),
    typeDefs,
  }
}
