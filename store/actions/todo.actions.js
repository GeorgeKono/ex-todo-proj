import { todoService } from "../../services/todo.service.js"
import { ADD_TODO, REMOVE_TODO, SET_LOADING, SET_TODOS, store, UPDATE_TODO } from "../store.js"

export function loadTodos() {
    store.dispatch({ type: SET_LOADING, isLoading: true})
    return todoService.query()
        .then(todos => store.dispatch({ type: SET_TODOS, todos}))
        .finally(() => store.dispatch({ type: SET_LOADING, isLoading: false}))
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId}))
}

export function saveTodo(todoToSave) {
    const type = todoToSave._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todoToSave)
        .then(savedTodo => store.dispatch({ type, todo: savedTodo }))
}