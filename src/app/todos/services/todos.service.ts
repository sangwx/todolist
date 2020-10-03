import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { ITodosState } from '../state/todos.reducer';
import { FILTER_MODES } from '../constants/filter-modes';
import * as TodoActions from '../state/todo.actions';
import * as todoSelectors from '../state/todo.selectors';
import { TodoStoreModule } from '../state';
import { ITodo } from '../interfaces';

@Injectable()
export class TodosService {

  allTodos$: Observable<ITodosState>;

  // const appStore$ = this.store$.pipe(select(getPlayer));
  //   appStore$.pipe(select(getSongList)).subscribe(list => this.watchList(list, 'songList'));

  constructor(
    private store: Store<TodoStoreModule>,
  ) {
    this.allTodos$ = this.store.pipe(select(todoSelectors.todosSelector))
  }

  addTodo(todo: ITodo): void {
    this.store.dispatch(TodoActions.addTodo({ todo }));
  }

  removeTodo(index: number): void {
    this.store.dispatch(TodoActions.removeTodo({ index }));
  }

  toggleAllCompleted(check: boolean): void {
    this.store.dispatch(TodoActions.toggleAllCompleted( {check} ));
  }

  changeFilterMode(mode: FILTER_MODES): void {
    this.store.dispatch(TodoActions.changeFilterMode({ mode }));
  }

  clearCompleted(): void {
    this.store.dispatch(TodoActions.clearCompleted());
  }
}
