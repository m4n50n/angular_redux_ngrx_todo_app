import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @ViewChild("inputFisico") txtInputFisico!: ElementRef;

  checkcompletado!: FormControl;
  inputEditado!: FormControl;
  editandoInput: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.checkcompletado = new FormControl(this.todo.completado); // El valor por defecto será el que tenga el todo recibido y no tendrá validaciones
    this.inputEditado = new FormControl(this.todo.texto, Validators.required);

    // Nos suscribimos al cambio de valor de la varialbe
    this.checkcompletado.valueChanges.subscribe(valor => {
      this.store.dispatch(toggle({ id: this.todo.id }));
    });
  }

  editar() {
    this.editandoInput = true;

    setTimeout(() => { // Si no hacemos el timeout el elemento no se habrá cargado aún cuando se quiera poner el foco sobre el
      this.txtInputFisico.nativeElement.select(); // Select selecciona todo el contenido del input
    }, 1);
  }

  terminarEdicion() {
    this.editandoInput = false;
  }
}
