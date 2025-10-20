import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovimientosState, selectAll } from './movimientos.reducer';

export const selectMovimientosState = createFeatureSelector<MovimientosState>('movimientos');

// Entity selectors
export const selectAllMovimientos = createSelector(
  selectMovimientosState,
  selectAll
);

// UI State
export const selectMovimientosLoading = createSelector(
  selectMovimientosState,
  (state) => state.loading
);

export const selectMovimientosError = createSelector(
  selectMovimientosState,
  (state) => state.error
);

// Form Value - Para prellenar el formulario si es necesario
export const selectMovimientoFormValue = createSelector(
  selectMovimientosState,
  (state) => state.formValue
);

// Movimientos recientes
export const selectMovimientosRecientes = createSelector(
  selectAllMovimientos,
  (movimientos) => [...movimientos]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 10)
);

// Estadísticas
export const selectMovimientosStats = createSelector(
  selectAllMovimientos,
  (movimientos) => ({
    total: movimientos.length,
    entradas: movimientos.filter(m => m.tipo === 'ENTRADA').length,
    salidas: movimientos.filter(m => m.tipo === 'SALIDA').length,
    ajustes: movimientos.filter(m => m.tipo === 'AJUSTE').length
  })
);