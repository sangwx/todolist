import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoValidator } from '@app/todos/helpers/todo-ctrl.validator';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  todoInput: FormControl;

  @Output() saveTodo = new EventEmitter<string>();

  constructor() { 
    this.todoInput = new FormControl('', [Validators.required, TodoValidator.isBlank])
  }

  ngOnInit(): void {
  }

  addTodo() {
    if (this.todoInput.valid) {
      const todo = this.todoInput.value;
      this.todoInput.setValue('', { emitEvent: false });
      this.saveTodo.emit(todo);
    }
  }

}
