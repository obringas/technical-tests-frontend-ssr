import { createAction, props } from '@ngrx/store';
import { Movimiento, CreateMovimientoDto } from '../models/movimiento.model';

// Load
export const loadMovimientos = createAction(
  '[Movimientos] Load Movimientos'
);

export const loadMovimientosSuccess = createAction(
  '[Movimientos] Load Movimientos Success',
  props<{ movimientos: Movimiento[] }>()
);

export const loadMovimientosFailure = createAction(
  '[Movimientos] Load Movimientos Failure',
  props<{ error: string }>()
);

// Create
export const createMovimiento = createAction(
  '[Movimientos] Create Movimiento',
  props<{ movimiento: CreateMovimientoDto }>()
);

export const createMovimientoSuccess = createAction(
  '[Movimientos] Create Movimiento Success',
  props<{ movimiento: Movimiento }>()
);

export const createMovimientoFailure = createAction(
  '[Movimientos] Create Movimiento Failure',
  props<{ error: string }>()
);

// Reset Form (para ngrx-forms)
export const resetMovimientoForm = createAction(
  '[Movimientos] Reset Form'
);