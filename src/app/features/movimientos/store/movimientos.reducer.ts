import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Movimiento, MovimientoFormValue } from '../models/movimiento.model';
import * as MovimientosActions from './movimientos.actions';

// Ordenar por fecha descendente para que los más nuevos siempre estén primero
export function sortMovimientos(a: Movimiento, b: Movimiento): number {
  return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
}

export const initialFormValue: MovimientoFormValue = {
  productoId: null,
  tipo: null,
  cantidad: null,
  motivo: ''
};

export interface MovimientosState extends EntityState<Movimiento> {
  formValue: MovimientoFormValue;
  loading: boolean;
  error: string | null;
}

// Usamos el sortComparer para mantener la colección ordenada por fecha
export const adapter: EntityAdapter<Movimiento> = createEntityAdapter<Movimiento>({
  sortComparer: sortMovimientos,
});

export const initialState: MovimientosState = adapter.getInitialState({
  formValue: initialFormValue,
  loading: false,
  error: null
});

export const movimientosReducer = createReducer(
  initialState,

  // Load
  on(MovimientosActions.loadMovimientos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(MovimientosActions.loadMovimientosSuccess, (state, { movimientos }) =>
    // setAll usará automáticamente el sortComparer para ordenar
    adapter.setAll(movimientos, { ...state, loading: false })
  ),
  on(MovimientosActions.loadMovimientosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create
  on(MovimientosActions.createMovimiento, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  // MEJORA CLAVE AQUÍ
  on(MovimientosActions.createMovimientoSuccess, (state, { movimiento }) =>
    // addOne también respetará el orden definido en sortComparer
    adapter.addOne(movimiento, {
      ...state,
      loading: false,
      formValue: initialFormValue // Resetea el valor del formulario en el estado
    })
  ),

  on(MovimientosActions.createMovimientoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Reset Form
  on(MovimientosActions.resetMovimientoForm, (state) => ({
    ...state,
    formValue: initialFormValue
  }))
);

// Selectors del adapter
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();