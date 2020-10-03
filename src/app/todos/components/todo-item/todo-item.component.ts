import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoValidator } from '@app/todos/helpers/todo-ctrl.validator';
import { ITodo } from '@app/todos/interfaces';
import { timer } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {

  @ViewChild('textInput', { static: true }) textInput: ElementRef;

  _todo: ITodo;
  todoItem: FormControl;
  checkComplete: FormControl = new FormControl(true);
  isEdit: boolean

  @Output() update = new EventEmitter<ITodo>();
  @Output() delete = new EventEmitter<number>();

  @Input()
  set todo(todo: ITodo) {
    this._todo = todo;
    this.todoItem.setValue(this._todo.text);
    this.checkComplete.setValue(this._todo.completed, {emitEvent: false});
  }

  constructor(
  ) { 
    this.todoItem = new FormControl('', [Validators.required, TodoValidator.isBlank]);
    this.checkComplete.setValue(true, {emitEvent: false});
    this.checkComplete.valueChanges.subscribe(state => {
      const updated: ITodo = {
        id: this._todo.id,
        text: this._todo.text,
        completed: state
      };
      this.update.emit(updated);
    });
  }

  ngOnInit(): void {
  }

  updateTodo() {
    if (this.todoItem.valid && this.isEdit) {
      const update: ITodo = {
        id: this._todo.id,
        text: this.todoItem.value,
        completed: this._todo.completed
      };
      this.update.emit(update);
      this.isEdit = false;
    }
  }

  deleteTodo() {
    this.delete.emit(this._todo.id)
  }

  editTodo() {
    this.isEdit = true;
    timer(10).subscribe(() => {
      this.textInput.nativeElement.focus();
    })
  }
  

}
