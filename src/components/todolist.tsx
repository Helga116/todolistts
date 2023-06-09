import React, {ChangeEvent} from 'react';
import {FilterValueType} from "../App";
import AddItemForm from "./addItemForm";


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
    filter: FilterValueType,
    removeTodolist: (todolistId: string) => void
}
const TodoList = (props: PropsType) => {

    const handleClickAll = () => props.changeFilter("all", props.id)
    const handleClickCompleted = () => props.changeFilter("completed", props.id)
    const handleClickActive = () => props.changeFilter("active", props.id)
    const removeTodolist = () => props.removeTodolist(props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>Delete</button>
            </h3>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const handleTaskClick = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, event.currentTarget.checked, props.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                                <span>{t.title}</span>
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

