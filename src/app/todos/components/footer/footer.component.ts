import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FILTER_MODES } from '@app/todos/constants/filter-modes';
import { ITodo } from '@app/todos/interfaces';
import { TodoStoreModule } from '@app/todos/state';
import { clearCompleted } from '@app/todos/state/todo.actions';
import { getActiveTodo, getCompletedTodo } from '@app/todos/state/todo.selectors';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // currentFilter: FILTER_MODES = "all";

  @Input() todoCount: number;
  @Input() mode: FILTER_MODES;
  @Input() completeCount: number;

  @Output() clearComplete = new EventEmitter<void>(); 
  @Output() setMode = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  changeMode(mode: string) {
    this.setMode.emit(mode)
  }
}
