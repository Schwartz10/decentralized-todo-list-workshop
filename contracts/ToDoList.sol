pragma solidity ^0.4.18;

contract ToDoList {

    /*--------------------- EVENTS ---------------------*/

    event CreatedToDo(uint toDoId, string task);
    event CompletedToDo(uint toDoId);

    /*-------------------- DATA TYPES --------------------*/

    struct ToDo {
        string task;
        bool complete;
    }

    /*--------------------- STORAGE ---------------------*/

    // keeps track of the contract owner
    address owner;

    // stores all our todos
    ToDo[] toDos;

    /*-------------- CONTRACT INSTATIATION --------------*/

    // a function with the same name as the contract is treated as the "constructor"
    function ToDoList() public {
        owner = msg.sender;
    }

    /*-------------------- MODIFIERS --------------------*/

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    /*--------------------- CREATION ---------------------*/

    function createToDo(string task) onlyOwner public {
        // create a todo and push it into the storage array
        uint id = toDos.push(ToDo(task, false)) - 1;
        // fire the todo creation event
        CreatedToDo(id, task);
    }

    /*-------------------- COMPLETION --------------------*/

    function completeToDo(uint id) onlyOwner public {
        // access the todo in storage
        ToDo storage toDo = toDos[id];
        // mark the todo as complete
        toDo.complete = true;
        // fire the complete to do event
        CompletedToDo(id);
    }

    /*--------------------- QUERYING ---------------------*/

    // on the front end, we can initially call this func to get the total number of todos
    // then create a for loop, loop from (i = 0 => totalToDos) and call returnToDo (seen below)
    function getTotalNumToDos() public view returns (uint){
        return toDos.length;
    }

    function returnToDo(uint toDoId) public view returns (string task, bool completed) {
        ToDo storage toDo = toDos[toDoId];
        task = toDo.task;
        completed = toDo.complete;
    }
}
