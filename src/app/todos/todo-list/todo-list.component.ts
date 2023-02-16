import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Todo } from '../models/todo.model';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select("todos").subscribe(todos => this.todos = todos);
  }

  ngOnDestroy(): void {
    // En este caso, el usuario permanecerá en la misma página porque solo hay una, pero si hubiera más, ondestroy deberíamos de cancelar las suscripciones
  }
}
