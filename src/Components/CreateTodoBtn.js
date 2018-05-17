import React, { Component } from 'react'
import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap'

export default class CreateToDoBtn extends Component {
  constructor(props){
    super(props)
    this.state = {
      taskName: ""
    }
  }

  handleInputChange(event){
    this.setState({ taskName: event.target.value })
  }

  async handleCreateTodo(){
    const { taskName } = this.state
    const { contract, account } = this.props
    console.log(taskName, contract, account)
    const todo = await contract.createTodo(taskName, {from: account})
    console.log(todo)
  }

  render(){
    return (
      <div className="col-md-6">
        <FormGroup>
          <InputGroup>
            <InputGroup.Button>
              <Button onClick={this.handleCreateTodo.bind(this)} bsStyle="info">Create To Do</Button>
            </InputGroup.Button>
            <FormControl onChange={this.handleInputChange.bind(this)} type="text" />
          </InputGroup>
        </FormGroup>
      </div>
    )
  }
}
