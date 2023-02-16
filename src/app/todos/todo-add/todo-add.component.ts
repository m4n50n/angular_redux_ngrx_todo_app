import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as actions from '../todo.actions';
@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {
  txtInput: FormControl;

  constructor(private store: Store<AppState>) {
    this.txtInput = new FormControl("", Validators.required) // Inicializamos con un string vacío y asignamos el validador de parámetro requerido
  }

  ngOnInit(): void {
  }

  agregar() {
    // console.log(this.txtInput.value); // Valor actual del input
    // console.log(this.txtInput.valid); // Comprobar si el input es válido

    if (this.txtInput.invalid) { return; } // Si el input no es válido no se hará nada
    this.store.dispatch(actions.crear({ texto: this.txtInput.value }));

    this.txtInput.reset();
  }
}
