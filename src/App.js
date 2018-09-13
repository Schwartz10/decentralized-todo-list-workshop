import React, { Component } from 'react'
import { DisplayTodos, CreateTodoBtn } from './Components'

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

  componentDidMount(){
    /* GET THE WEB3 OBJECT HERE AND INSTANTIATE SMART CONTRACT */
  }

  render() {
    const { todos } = this.state
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
                createTodo={null /* createTodoSmartContractFunc goes here */}
              />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App
