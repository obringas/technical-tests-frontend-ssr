import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductosState, selectAll, selectEntities } from './productos.reducer';

// Feature selector
export const selectProductosState = createFeatureSelector<ProductosState>('productos');

// Entity selectors
export const selectAllProductos = createSelector(
  selectProductosState,
  selectAll
);

export const selectProductosEntities = createSelector(
  selectProductosState,
  selectEntities
);

// UI State selectors
export const selectProductosLoading = createSelector(
  selectProductosState,
  (state) => state.loading
);

export const selectProductosError = createSelector(
  selectProductosState,
  (state) => state.error
);

export const selectSelectedProductoId = createSelector(
  selectProductosState,
  (state) => state.selectedProductoId
);

// Selected producto
export const selectSelectedProducto = createSelector(
  selectProductosEntities,
  selectSelectedProductoId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

// Filtered selectors (ejemplos útiles)
export const selectActiveProductos = createSelector(
  selectAllProductos,
  (productos) => productos.filter(p => p.activo)
);

export const selectProductosByCategoria = (categoria: string) =>
  createSelector(
    selectAllProductos,
    (productos) => productos.filter(p => p.categoria === categoria)
  );

export const selectProductosCount = createSelector(
  selectAllProductos,
  (productos) => productos.length
);