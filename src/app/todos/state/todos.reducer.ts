import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';

import { FILTER_MODES } from './../constants/filter-modes';
import { ITodo } from '../interfaces/ITodo';

export type ITodosState = {
  filterMode: FILTER_MODES,
  todos: ITodo[]
}

export const initialState: ITodosState = {
  filterMode: 'all',
  todos: [],
};

const reducer = createReducer(
  initialState,
  
  //Add new Todo
  on(TodoActions.addTodo, (state, { todo }) => {
    // console.log('state', state)
    // console.log('todo', [...state.todos, todo])
    return { ...state, todos: [...state.todos, todo] }
  }),

  //Update Todo list
  on(TodoActions.updateTodo, (state, { todo }) => {
    let todoList = state.todos.slice();
    let update_index = todoList.findIndex(item => item.id === todo.id);
    let prev = todoList.slice(0, update_index);
    let next = todoList.slice(update_index + 1, todoList.length);
    return {
      ...state,
      todos: [...prev, todo, ...next]
    }
  }),

  //Remove one Todo
  on(TodoActions.removeTodo, (state, { index }) => {
    const updatedTodos = [...state.todos];
    const todo_i = state.todos.findIndex(item => item.id === index);
    updatedTodos.splice(todo_i, 1);
    return {
      ...state,
      todos: updatedTodos,
    };
  }),

  //Change Filter
  on(TodoActions.changeFilterMode, (state, { mode }) => ({
    ...state,
    filterMode: mode,
  })),

  //Remove All Completed Todo
  on(TodoActions.clearCompleted, (state) => ({
    ...state,
    todos: [...state.todos.filter(todo => !todo.completed)],
  })),

  //Toggle All to Complete
  on(TodoActions.toggleAllCompleted, (state, { check }) => {
    let todoList = [];
    state.todos.forEach((item) => {
      let copy_item = Object.assign({}, item);
      copy_item.completed = check ? true : false;
      todoList.push(copy_item)
    })
    return {
      ...state,
      todos: todoList
    }
  })
);

export function todosReducer(state: ITodosState, action: Action) {
  return reducer(state, action);
}
