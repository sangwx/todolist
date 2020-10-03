import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FILTER_MODES } from '@app/todos/constants/filter-modes';
import { getRandomNum } from '@app/todos/helpers/number';
import { ITodo } from '@app/todos/interfaces';
import { TodoStoreModule } from '@app/todos/state';
import { addTodo, clearCompleted, toggleAllCompleted } from '@app/todos/state/todo.actions';
import { getTodoCount, getFilter, getAllTodo, getCompletedTodo } from '@app/todos/state/todo.selectors';
import { select, Store } from '@ngrx/store';
 
@Component({
  selector: 'app-todo-all',
  templateUrl: './todo-all.component.html',
  styleUrls: ['./todo-all.component.scss'],
})
export class TodoAllComponent implements OnInit {

  isShow: boolean = false;
  
  todoCount: number;
  completeCount: number;
  mode: FILTER_MODES;

  toComplete: FormControl = new FormControl(false);

  constructor(
    private store$: Store<TodoStoreModule>,
  ) { 
    this.store$.pipe(select(getAllTodo)).subscribe(todoList => this.watchAllTodo(todoList));
    this.store$.pipe(select(getCompletedTodo)).subscribe((list) => this.watchComplete(list));
    this.store$.pipe(select(getTodoCount)).subscribe(count => this.watchCount(count));
    this.store$.pipe(select(getFilter)).subscribe(mode => this.watchMode(mode));

    // this.toComplete.setValue(true, {emitEvent: false});
  }

  ngOnInit(): void {

  }

  private watchAllTodo(todoList) {
    let len = todoList.length;
    // console.log(11, todoList, len)
    this.isShow = len === 0 ? true : false;
  }
  
  private watchComplete(list: ITodo[]) {
    this.completeCount = list.length
  }

  private watchCount(count: number) {
    // console.log(count)
    this.todoCount = count;
  }

  private watchMode(mode) {
    console.log(mode)
    this.mode = mode;
  }

  onSaveTodo(text: string) {
    const newTodo: ITodo = {
      id: getRandomNum(),
      text,
      completed: false
    }
    this.store$.dispatch(addTodo({todo: newTodo}));
  }

  clearComplete() {
    this.store$.dispatch(clearCompleted());
  }

  toggleAll() {
    let val = !this.toComplete.value;
    this.toComplete.setValue(val, {emitEvent: false});
    // console.log(this.toComplete)
    this.store$.dispatch(toggleAllCompleted({check: this.toComplete.value}))
  }

}
