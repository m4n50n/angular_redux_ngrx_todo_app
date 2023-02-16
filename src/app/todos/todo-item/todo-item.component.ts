import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { editar, toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @ViewChild("inputFisico") inputTextFisico!: ElementRef;

  checkcompletado!: FormControl;
  inputText!: FormControl;
  enEdicion: boolean = false; 

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.checkcompletado = new FormControl(this.todo.completado); // El valor por defecto será el que tenga el todo recibido y no tendrá validaciones
    this.inputText = new FormControl(this.todo.texto, Validators.required);

    // Nos suscribimos al cambio de valor de la varialbe
    this.checkcompletado.valueChanges.subscribe(valor => {
      this.store.dispatch(toggle({ id: this.todo.id }));
    });
  }

  editar() {
    this.enEdicion = true;
    this.inputText.setValue(this.todo.texto); // Esto es útil para setear la información del input al quel e hemos dado doble click

    setTimeout(() => { // Si no hacemos el timeout el elemento no se habrá cargado aún cuando se quiera poner el foco sobre el
      this.inputTextFisico.nativeElement.select(); // Select selecciona todo el contenido del input
    }, 1);
  }

  terminarEdicion() {
    this.enEdicion = false;

    if (this.inputText.invalid) { return; }
    if (this.inputText.value === this.todo.texto) { return; }

    this.store.dispatch(editar({ id: this.todo.id, texto: this.inputText.value }))
  }
}
