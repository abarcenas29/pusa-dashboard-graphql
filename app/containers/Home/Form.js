import React from 'react'
import { Form, Field } from 'react-final-form'
import { commitMutation, graphql } from 'react-relay'

const UserForm = ({ relay }) => {
  const onSubmit = values => {
    commitMutation(
      relay.environment,
      {
        mutation: graphql`
          mutation FormMutation ($input : inputUser) {
            addUser(user: $input) {
              edges {
                user : node {
                  first_name,
                  last_name
                }
              }
            }
          }
        `,
        variables: {
          input: { ...values }
        },
        onCompleted: (a) => {
          console.log(a, 'call success')
        },
        onError: (e) => {
          console.log(e)
        }
      }
    )
    console.log(values)
  }

  return (
    <Form onSubmit={onSubmit}>
      {
        ({ handleSubmit }) => (
          <form onSubmit={handleSubmit} >
            <ul className='l-d-b l-lst-n'>
              <li className='l-d-f'>
                <label>First Name</label>
                <Field
                  name='first_name'
                  component='input'
                  type='text'
                />
              </li>
              <li className='l-d-f'>
                <label>Last Name</label>
                <Field
                  name='last_name'
                  component='input'
                  type='text'
                />
              </li>
              <li className='l-d-f'>
                <label>Email</label>
                <Field
                  name='email'
                  component='input'
                  type='text'
                />
              </li>
              <li>
                <button type='submit'>
                  Submit
                </button>
              </li>
            </ul>
          </form>
        )
      }
    </Form>
  )
}

export default UserForm
