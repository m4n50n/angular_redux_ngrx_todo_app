import { Todo } from './todos/models/todo.model';

// Indicará cómo se encuentra el estado global de la aplicación
export interface AppState {
    todos: Todo[],
    usuario: {}
}