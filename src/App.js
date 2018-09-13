import React, { Component } from 'react'
import { DisplayTodos, CreateTodoBtn } from './Components'
import Contract from 'truffle-contract';
import TodoListContract from '../build/contracts/TodoList.json'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todoListInstance: {},
      todos: [],
    }
  }

  async componentDidMount(){
    /*
      GET THE WEB3 OBJECT HERE,
      INSTANTIATE SMART CONTRACT,
      GET TODOS
    */

    await this.instantiateContract();
  }

  async instantiateContract(){
    const contract = require('truffle-contract');
    // turns our smart contract JSON blob into a javascript object
    const todoList = contract(TodoListContract);
    // set the provider of the contract instance to be whatever blockchain node we're connected to
    todoList.setProvider(window.web3.currentProvider);
    // find our deployed instance of smart contract
    const todoListInstance = await todoList.deployed();
    // set our state with the todoListInstance
    this.setState({ todoListInstance });
  }

  render() {
    const { todos, todoListInstance: { createTodo } } = this.state;
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
              <DisplayTodos
                completeTodo={null /* completeTodoSmartContractFunc goes here */}
                todos={todos}
              />
              <CreateTodoBtn
                createTodo={createTodo}
              />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App
