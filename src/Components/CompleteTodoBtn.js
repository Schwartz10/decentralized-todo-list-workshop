import React from 'react'
import { Button } from 'react-bootstrap'

const CopmleteTodoBtn = ({ completeTodo }) => (
  <Button onClick={completeTodo} bsStyle="primary" bsSize="sm">Complete</Button>
)


export default CopmleteTodoBtn
