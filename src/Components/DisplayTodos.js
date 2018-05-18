import React from 'react'
import { Table, thead, tr, th, tbody, td, Jumbotron } from 'react-bootstrap'
import CompleteTodoBtn from './CompleteTodoBtn'

const DisplayTodos = ({ todos, completeTodo, account }) => (
  <div>
    {todos && todos.length > 0 ?
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {
            todos.map(([task, completed], id) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{task}</td>
                <td>{completed.toString()}</td>
                <td><CompleteTodoBtn completeTodo={() => completeTodo(id, {from: account})} /></td>
              </tr>
            ))
          }
        </tbody>
      </Table>

      :

      <div>
        <Jumbotron>
          <h1>No todos! </h1>
          <p>
          You either don't have any todos yet or are not passing an array of todos to the DisplayTodos Component
          </p>
        </Jumbotron>
      </div>
    }
  </div>
)

export default DisplayTodos
