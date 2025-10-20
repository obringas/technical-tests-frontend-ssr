import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Producto } from '../models/producto.model';
import * as ProductosActions from './productos.actions';

export interface ProductosState extends EntityState<Producto> {
  selectedProductoId: number | null;
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Producto> = createEntityAdapter<Producto>();

export const initialState: ProductosState = adapter.getInitialState({
  selectedProductoId: null,
  loading: false,
  error: null
});

export const productosReducer = createReducer(
  initialState,

  // Load
  on(ProductosActions.loadProductos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductosActions.loadProductosSuccess, (state, { productos }) =>
    adapter.setAll(productos, { ...state, loading: false })
  ),
  on(ProductosActions.loadProductosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create
  on(ProductosActions.createProducto, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductosActions.createProductoSuccess, (state, { producto }) =>
    adapter.addOne(producto, { ...state, loading: false })
  ),
  on(ProductosActions.createProductoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update
  on(ProductosActions.updateProducto, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductosActions.updateProductoSuccess, (state, { producto }) =>
    adapter.updateOne(
      { id: producto.id, changes: producto },
      { ...state, loading: false, selectedProductoId: null }
    )
  ),
  on(ProductosActions.updateProductoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete
  on(ProductosActions.deleteProducto, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductosActions.deleteProductoSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(ProductosActions.deleteProductoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Selection
  on(ProductosActions.selectProducto, (state, { producto }) => ({
    ...state,
    selectedProductoId: producto?.id ?? null
  })),
  on(ProductosActions.clearSelection, (state) => ({
    ...state,
    selectedProductoId: null
  }))
);

// Selectors del adapter
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();