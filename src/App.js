import React, { Component } from 'react'
import TodoListContract from '../build/contracts/TodoList.json'
import getWeb3 from './utils/getWeb3'
import { DisplayTodos, CreateTodo } from './Components'

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
      todos: []
    }
  }

  async componentDidMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    try {
      const { web3 } = await getWeb3
      // put web3 object on state and then instantiate the smart contract
      this.setState({ web3 }, () => this.getAccountAndContractData(web3))
    } catch (err) {
      console.log(err.message)
    }
  }

  async getAccountAndContractData(web3) {
    // web3.eth.getAccounts() returns an array with the 0th element being the account currently signed in to metamask
    // instantiate contract gets our smart contract from the blockchain
    const [[ account ], todoListInstance ] = await Promise.all([ web3.eth.getAccounts(), this.instantiateContract() ])
    const todos = await this.getTodos(todoListInstance)
    this.setState({ todos, account, todoListInstance })
  }

  async instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    // turns our smart contract JSON blob into a javascript object
    const todoList = contract(TodoListContract)
    // set the provider of the contract instance to be whatever blockchain node we're connected to
    todoList.setProvider(this.state.web3.currentProvider)

    // find our deployed instance of smart contract
    const todoListInstance = await todoList.deployed()
    return todoListInstance
  }

  async getTodos(todoListInstance){
    // we invoke solidity view functions with .call as to not sign and submit a transaction (making this call "free")
    const numTodos = await todoListInstance.getTotalNumTodos.call()
    let todos = []
    //loop through the total number of todos and call smart contract func to return single todo
    for (let i = 0; i < numTodos; i++) {
      const todo = await todoListInstance.returnTodo.call(i)
      todos.push(todo)
    }
    return todos
  }

  render() {
    const { todoListInstance, account, todos } = this.state
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
              <DisplayTodos todos={todos} />
              <CreateTodo account={account} contract={todoListInstance} />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App
