import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { TodosListComponent } from './components/todo-list/todo-list.component';
import { TodosService } from './services/todos.service';
import { todosReducer } from './state/todos.reducer';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoAllComponent } from './components/todo-all/todo-all.component';
import { TodosRoutingModule } from './todos-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

const DECLARATIONS = [
  TodosListComponent,
];

@NgModule({
  declarations: [
    ...DECLARATIONS,
    AddTodoComponent,
    TodoAllComponent,
    FooterComponent,
    TodoItemComponent,
  ],
  exports: [
    ...DECLARATIONS,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodosRoutingModule,
  ],
  providers: [
    TodosService,
  ],
})
export class TodosModule {}
