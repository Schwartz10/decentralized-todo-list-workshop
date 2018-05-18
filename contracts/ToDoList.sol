pragma solidity ^0.4.18;

contract TodoList {

    /*--------------------- EVENTS ---------------------*/

    event CreatedTodo(uint todoId, string task);
    event CompletedTodo(uint todoId);

    /*-------------------- DATA TYPES --------------------*/

    struct Todo {
        string task;
        bool complete;
    }

    /*--------------------- STORAGE ---------------------*/

    // keeps track of the contract owner
    address owner;

    // stores all our todos
    Todo[] todos;

    /*-------------- CONTRACT INSTATIATION --------------*/

    // a function with the same name as the contract is treated as the "constructor"
    function TodoList() public {
        owner = msg.sender;
    }

    /*-------------------- MODIFIERS --------------------*/

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    /*--------------------- CREATION ---------------------*/

    function createTodo(string task) onlyOwner public {
        // create a todo and push it into the storage array
        uint id = todos.push(Todo(task, false)) - 1;
        // fire the todo creation event
        CreatedTodo(id, task);
    }

    /*-------------------- COMPLETION --------------------*/

    function completeTodo(uint id) onlyOwner public {
        // access the todo in storage
        Todo storage todo = todos[id];
        // mark the todo as complete
        todo.complete = true;
        // fire the complete to do event
        CompletedTodo(id);
    }

    /*--------------------- QUERYING ---------------------*/

    // on the front end, we can initially call this func to get the total number of todos
    // then create a for loop, loop from (i = 0 => totalToDos) and call returnToDo (seen below)
    function getTotalNumTodos() public view returns (uint){
        return todos.length;
    }

    function returnTodo(uint todoId) public view returns (string task, bool completed) {
        Todo storage todo = todos[todoId];
        task = todo.task;
        completed = todo.complete;
    }
}
