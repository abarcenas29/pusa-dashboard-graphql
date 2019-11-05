import React from 'react'
import { graphql, QueryRenderer } from 'react-relay'

import environment from 'App/environment'

export default () => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query HomeQuery {
          userList : usersConnection {
            edges {
              node {
                first_name,
                last_name
              }
            }
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        console.log(props, error, 'props')
        if (props) {
          return (
            <div>
            This is Home
            </div>
          )
        } else {
          return <div>Error</div>
        }
      }}
    />
  )
}
