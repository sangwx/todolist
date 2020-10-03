import { createAction, props } from '@ngrx/store';
import { FILTER_MODES } from '../constants/filter-modes';
import { ITodo } from '../interfaces';

export const addTodo = createAction('[todos] Add Todo', props<{ todo: ITodo }>());
export const updateTodo = createAction('[todos] Update Todo', props<{ todo: ITodo }>());
export const removeTodo = createAction('[todos] Remove Todo', props<{index: number}>());
export const editTodo = createAction('[todos] Edit Todo', props<{ index: number }>());
export const toggleAllCompleted = createAction('[todos] Toggle All Completed', props<{ check: boolean }>());
export const changeFilterMode = createAction('[todos] Change Filter Mode', props<{ mode: FILTER_MODES }>());
export const clearCompleted = createAction('[todos] Clear Completed', );
