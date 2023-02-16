import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { FormControl } from '@angular/forms';
import { checkAll } from '../todo.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  checkCompletados!: FormControl;
  checkAllStatus: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.checkCompletados = new FormControl();

    this.checkCompletados.valueChanges.subscribe(isChecked => {
      this.store.dispatch(checkAll({check: this.checkAllStatus}));
      this.checkAllStatus = !this.checkAllStatus;
    })
  }

  toggleAll() {

  }

}
