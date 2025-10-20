import { ActionReducerMap } from '@ngrx/store';
import { ProductosState, productosReducer } from '../features/productos/store/productos.reducer';

export interface AppState {
  productos: ProductosState;
}

export const appReducers: ActionReducerMap<AppState> = {
  productos: productosReducer
};