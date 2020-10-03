import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ITodosState } from "./todos.reducer";

const selectTodoState = (state) => state.todos;

export const todosSelector = createFeatureSelector<ITodosState>('todos');

export const getFilter = createSelector(selectTodoState, (state) => {
    return state.filterMode;
});

export const getActiveTodo = createSelector(selectTodoState, (state) => { return state.todos.filter(t => !t.completed) });
export const getCompletedTodo = createSelector(selectTodoState, (state) => { return state.todos.filter(t => t.completed) });

export const getAllTodo = createSelector(
    selectTodoState, 
    getActiveTodo, 
    getCompletedTodo, 
    (state, active, completed) => {
        if (state.filterMode === 'active') {
            return active;
        }
        else if (state.filterMode === 'completed') return completed
        return state.todos
});

export const getTodoCount = createSelector(getActiveTodo, (todos) => todos.length);

