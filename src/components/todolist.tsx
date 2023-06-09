import React, {ChangeEvent} from 'react';
import {FilterValueType} from "../App";
import AddItemForm from "./addItemForm";
import {EditableSpan} from "./editableSpan";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todolistId: string) => void,
    changeFilter: (value: FilterValueType, todoId: string) => void,
    addTask: (title: string, todolistId: string) => void,
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void,
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void,
    filter: FilterValueType,
    removeTodolist: (todolistId: string) => void,
    changeTodolistTitle: (id: string, title: string) => void
}
const TodoList = (props: PropsType) => {

    const handleClickAll = () => props.changeFilter("all", props.id)
    const handleClickCompleted = () => props.changeFilter("completed", props.id)
    const handleClickActive = () => props.changeFilter("active", props.id)
    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>Delete</button>
            </h3>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const handleTaskClick = () => props.removeTask(t.id, props.id)
                        const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, event.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (value: string) => {
                            props.changeTaskTitle(t.id, value, props.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <button onClick={handleTaskClick}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={handleClickAll}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={handleClickActive}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={handleClickCompleted}>Completed
                </button>
            </div>

        </div>
    );
};

export default TodoList;




