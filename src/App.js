import React, { Component } from 'react'
import TodoListContract from '../build/contracts/TodoList.json'
import getWeb3 from './utils/getWeb3'
import { DisplayTodos, CreateTodoBtn } from './Components'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      account: '0x0000000000000',
      todoListInstance: {},
      todos: [],
      createTodoSmartContractFunc: null,
      completeTodoSmartContractFunc: null
    }
  }

  render() {
    const { account, todos, createTodoSmartContractFunc, completeTodoSmartContractFunc } = this.state
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">My Todo List!</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>My todos!</h1>
              <p>Coming directly from my smart contract</p>
              <DisplayTodos account={account} completeTodo={completeTodoSmartContractFunc} todos={todos} />
              <CreateTodoBtn account={account} createTodo={createTodoSmartContractFunc} />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App
