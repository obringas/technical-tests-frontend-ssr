import { createAction, props } from '@ngrx/store';
import { Producto, CreateProductoDto, UpdateProductoDto } from '../models/producto.model';

// Load Productos
export const loadProductos = createAction('[Productos Page] Load Productos');
export const loadProductosSuccess = createAction(
  '[Productos API] Load Productos Success',
  props<{ productos: Producto[] }>()
);
export const loadProductosFailure = createAction(
  '[Productos API] Load Productos Failure',
  props<{ error: string }>()
);

// Create Producto
export const createProducto = createAction(
  '[Producto Form] Create Producto',
  props<{ producto: CreateProductoDto }>()
);
export const createProductoSuccess = createAction(
  '[Productos API] Create Producto Success',
  props<{ producto: Producto }>()
);
export const createProductoFailure = createAction(
  '[Productos API] Create Producto Failure',
  props<{ error: string }>()
);

// Update Producto
export const updateProducto = createAction(
  '[Producto Form] Update Producto',
  props<{ producto: UpdateProductoDto }>()
);
export const updateProductoSuccess = createAction(
  '[Productos API] Update Producto Success',
  props<{ producto: Producto }>()
);
export const updateProductoFailure = createAction(
  '[Productos API] Update Producto Failure',
  props<{ error: string }>()
);

// Delete Producto
export const deleteProducto = createAction(
  '[Producto List] Delete Producto',
  props<{ id: number }>()
);
export const deleteProductoSuccess = createAction(
  '[Productos API] Delete Producto Success',
  props<{ id: number }>()
);
export const deleteProductoFailure = createAction(
  '[Productos API] Delete Producto Failure',
  props<{ error: string }>()
);

// Select Producto
export const selectProducto = createAction(
  '[Producto List] Select Producto',
  props<{ producto: Producto | null }>()
);


// Clear Selection
export const clearSelection = createAction('[Producto Form] Clear Selection');