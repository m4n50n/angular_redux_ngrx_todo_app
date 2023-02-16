import { createAction, props } from '@ngrx/store';

export const crear = createAction(
    '[TODO] Crear Todo',
    props<{ texto: string }>()
);

export const toggle = createAction(
    '[TODO] Toggle Todo',
    props<{ id: number | undefined }>());

export const editar = createAction(
    '[TODO] Editar Todo',
    props<{ id: number | undefined, texto: string }>());

export const borrar = createAction(
    '[TODO] Borrar Todo',
    props<{ id: number | undefined }>());

export const checkAll = createAction(
    '[TODO] Marcar todo como completado / no completado',
    props<{ check: boolean }>());