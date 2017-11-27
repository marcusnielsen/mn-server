const makeGetUsers = ({ effect, endpoints, actions }) => () =>
  effect({ endpoint: endpoints.users.root, action: actions.get })

const makeGetProfile = ({ effect, endpoints, actions }) => data =>
  effect({ endpoint: endpoints.users.profile, action: actions.get, data })

export const makeModel = props => {
  const { connector } = props

  return {
    getProfile: makeGetProfile(connector),
    getUsers: makeGetUsers(connector),
  }
}
