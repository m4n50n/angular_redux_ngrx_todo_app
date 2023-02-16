import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear, toggle } from './todo.actions';

export const initialState: Todo[] = [ // Únicamente trabajaremos con un array de todos
  new Todo("Estudiar") // Agregar un todo por defecto
];

export const todoReducer = createReducer(
  initialState,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggle, (state, { id }) => {
    console.log("el estado ess: ", state);
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      }

      return todo;
    })
  }),
);