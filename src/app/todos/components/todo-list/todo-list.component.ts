import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FILTER_MODES } from '@app/todos/constants/filter-modes';
import { ITodo } from '@app/todos/interfaces';
import { TodoStoreModule } from '../../state/index';
import { removeTodo, updateTodo } from '@app/todos/state/todo.actions';
import { getActiveTodo, getAllTodo } from '@app/todos/state/todo.selectors';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-todos-list',
  styleUrls: [
    './todo-list.component.scss',
  ],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent {

  @Input() mode: FILTER_MODES;

  todoList: ITodo[];
  checkComplete: FormControl;

  constructor(
    private store$: Store<TodoStoreModule>
  ) { 
    this.checkComplete = new FormControl(false)
    this.store$.pipe(select(getAllTodo)).subscribe(list => this.watchAllTodo(list));
  }

  private watchAllTodo(list: ITodo[]) {
    this.todoList = list;
  }

  onUpdate(todo: ITodo) {
    this.store$.dispatch(updateTodo({todo: todo}))
  }

  onDelete(id: number) {
    this.store$.dispatch(removeTodo({index: id}))
  }


}
