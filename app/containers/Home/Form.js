import React from 'react'
import { Form, Field } from 'react-final-form'
import { commitMutation, graphql, ConnectionHandler } from 'react-relay'

const UserForm = ({ relay, listUser }) => {
  const onSubmit = values => {
    let tempId = 0
    commitMutation(
      relay.environment,
      {
        mutation: graphql`
          mutation FormMutation ($input : addUserInput!) {
            addUser(input: $input) {
              userEdge {
                cursor,
                node {
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
        optimisticUpdater: store => {
          const id = `client:newUser:${tempId++}`

          // node with the temp values
          const node = store.create(id, 'UserType')
          node.setValue('999', 'id')
          node.setValue('optimistic first name', 'first_name')
          node.setValue('optimistic last name', 'last_name')

          const newEdge = store.create(`client:newEdge`, 'userConnectionEdge')
          newEdge.setLinkedRecord(node, 'node')

          const listUserProxy = store.get(listUser.id)
          const conn = ConnectionHandler.getConnection(
            listUserProxy,
            'Home_listUser_userConnection'
          )
          ConnectionHandler.insertEdgeAfter(conn, newEdge)
        },
        updater: store => {
          const payload = store.getRootField('addUser')
          const newEdge = payload.getLinkedRecord('userEdge')

          const listUserProxy = store.get(listUser.id)
          const conn = ConnectionHandler.getConnection(
            listUserProxy,
            'Home_listUser_userConnection'
          )
          ConnectionHandler.insertEdgeAfter(conn, newEdge)
        },
        onCompleted: (a) => {
          console.log(a, 'call success')
        },
        onError: (e) => {
          console.log(e)
        }
      }
    )
  }

  return (
    <Form onSubmit={onSubmit}>
      {
        ({ handleSubmit }) => (
          <form onSubmit={handleSubmit} >
            <ul className='l-d-b l-lst-n'>
              <li className='l-d-b'>
                <label>First Name</label>
                <br />
                <Field
                  name='first_name'
                  component='input'
                  type='text'
                />
              </li>
              <li className='l-d-b'>
                <label>Last Name</label>
                <br />
                <Field
                  name='last_name'
                  component='input'
                  type='text'
                />
              </li>
              <li className='l-d-b'>
                <label>Email</label>
                <br />
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
