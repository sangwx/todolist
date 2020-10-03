import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoAllComponent } from './components/todo-all/todo-all.component';

const routes: Routes = [
  {
    path: '',
    component: TodoAllComponent
  },
  {
    path: ':mode',
    component: TodoAllComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
