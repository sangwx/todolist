import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectUrl } from './router.index';
import { ITodosState } from "./todos.reducer";

const selectTodoState = (state) => state.todos;

export const todosSelector = createFeatureSelector<ITodosState>('todos');

export const getFilter = createSelector(selectUrl, (url) => {
    console.log(url)
    // if (router?.state && router?.state?.params.mode) {
    //     const mode = router.state.params.mode;
    //     return mode !== 'completed' && mode !== 'active' ? 'all' : mode;
    // }
});

export const getAllTodo = createSelector(selectTodoState, (state) => {
    // console.log('state.todos type: ', typeof state.todos)   //should be Todo[] but is object
    // console.log('state.todos: ', state.todos)
    return state.todos
});
export const getActiveTodo = createSelector(selectTodoState, (state) => { return state.todos.filter(t => !t.completed) });
export const getCompletedTodo = createSelector(selectTodoState, (state) => { return state.todos.filter(t => t.completed) });

export const getTodoCount = createSelector(getActiveTodo, (todos) => todos.length);

