import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

const Item = ({ user }) => {
  const { first_name, last_name } = user
  return (
    <li>{`${first_name} ${last_name}`}</li>
  )
}

// fragment name suffix is what is the prop put in the parent container
export default createFragmentContainer(
  Item,
  {
    user: graphql`
      fragment Item_user on User {
        id,
        first_name,
        last_name
      }
    `
  }
)
