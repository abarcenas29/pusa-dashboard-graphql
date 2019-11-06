import React from 'react'
import {
  graphql,
  QueryRenderer,
  createFragmentContainer
} from 'react-relay'

import environment from 'App/environment'

import Form from './Form'
import Item from './Item'

const UserList = ({ relay, users }) => {
  return (
    <div className='l-d-b'>
      <Form relay={relay} />
      <ul>
        {
          users.edges.map((r, i) => (
            <Item key={r.node.id} user={r.node} />
          ))
        }
      </ul>
    </div>
  )
}

const UserListFrag = createFragmentContainer(
  UserList,
  {
    users: graphql`
      fragment Home_users on userConnection {
        edges {
          node {
            id
            ...Item_user
          }
        }
      }
    `
  }
)

export default () => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query HomeQuery {
          users : usersConnection {
            ...Home_users
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (props && props.users) {
          return (
            <UserListFrag users={props.users} />
          )
        }
        if (error) {
          return <div>Error</div>
        }
      }}
    />
  )
}
