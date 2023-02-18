import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear, editar, toggle, borrar, checkAll } from './todo.actions';

export const initialState: Todo[] = [ // Únicamente trabajaremos con un array de todos
  // new Todo("Estudiar") // Agregar un todo por defecto
];

export const todoReducer = createReducer(
  initialState,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggle, (state, { id }) => {
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
  on(editar, (state, { id, texto }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto
        }
      }

      return todo;
    })
  }),
  on(borrar, (state, { id }) => {
    return state.filter(todo => todo.id !== id);
  }),
  on(checkAll, (state, { check }) => {
    return state.map(todo => {
      return {
        ...todo,
        completado: check
      }
    })
  })
);