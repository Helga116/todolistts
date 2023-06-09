import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/todolist";
import {v1} from "uuid";
import AddItemForm from "./components/addItemForm";

export type FilterValueType = "all" | "completed" | "active"
type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "active"},
    ])

    const [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "HTTP", isDone: true},
            {id: v1(), title: "JS", isDone: false}],
        [todolistId2]: [
            {id: v1(), title: "Orange", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Buckwheat", isDone: false}
        ]
    })
    function changeFilter(value: FilterValueType, todoListId: string) {
        let todolist = todolists.find(tl => tl.id === todoListId)
        if(todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTask(id: string, todolistId: string) {
        debugger
        let tasks = tasksObj[todolistId]
        tasksObj[todolistId] = tasks.filter(t => t.id !== id);
        setTasksObj({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        const newTask = {id: v1(), title, isDone: false}
        tasksObj[todolistId] = [newTask, ...tasks]
        setTasksObj({...tasksObj});
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find( t => t.id === taskId)
        if(task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }
    function removeTodolist(todolistId: string) {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolists)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }
    function addTodoList(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolists([todolist, ...todolists]);
        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todolists.map(tl => {
                let tasksForTodoList = tasksObj[tl.id]
                if (tl.filter === "completed") {
                    tasksForTodoList = tasksObj[tl.id].filter(t => t.isDone)
                }
                if (tl.filter === "active") {
                    tasksForTodoList = tasksObj[tl.id].filter(t => !t.isDone)
                }

                return <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                />
            })}

        </div>
    );
}

export default App;
