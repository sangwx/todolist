import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environments/environment';
import { todosReducer } from './todos.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({ todos: todosReducer }, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 20,
      logOnly: environment.production
    }),
  ]
})
export class TodoStoreModule { }