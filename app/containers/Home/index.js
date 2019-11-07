import React from 'react'
import {
  graphql,
  QueryRenderer,
  createFragmentContainer
} from 'react-relay'

import environment from 'App/environment'

import Form from './Form'
import Item from './Item'

const UserList = ({ relay, listUser }) => {
  const { userConnection: { edges } } = listUser
  return (
    <div className='l-d-b'>
      <Form relay={relay} listUser={listUser} />
      <ul>
        {
          edges.map(({ node }, i) => {
            console.log(node)
            return (
              <Item key={node.id} user={node} />
            )
          })
        }
      </ul>
    </div>
  )
}

const UserListFrag = createFragmentContainer(
  UserList,
  {
    listUser: graphql`
      fragment Home_listUser on UsersType {
        id
        userConnection(
          first: 2147483647 ## As required
        ) @connection(key: "Home_listUser_userConnection")  {
          edges {
            node {
              id,
              ...Item_user
            }
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
          listUser {
            ...Home_listUser
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (props && props.listUser) {
          return (
            <UserListFrag listUser={props.listUser} />
          )
        }
        if (error) {
          return <div>Error</div>
        }
      }}
    />
  )
}
