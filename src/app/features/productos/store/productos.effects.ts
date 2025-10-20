import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { ProductoApiService } from '../services/producto-api.service';
import * as ProductosActions from './productos.actions';
import { MessageService } from 'primeng/api';

@Injectable()
export class ProductosEffects {
  
  loadProductos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductosActions.loadProductos),
      switchMap(() =>
        this.productoApiService.getAll().pipe(
          map(productos => ProductosActions.loadProductosSuccess({ productos })),
          catchError(error => {
            const errorMessage = this.getErrorMessage(error, 'cargar los productos');
            return of(ProductosActions.loadProductosFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  createProducto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductosActions.createProducto),
      switchMap(({ producto }) =>
        this.productoApiService.create(producto).pipe(
          map(newProducto => ProductosActions.createProductoSuccess({ producto: newProducto })),
          catchError(error => {
            const errorMessage = this.getErrorMessage(error, 'crear el producto');
            return of(ProductosActions.createProductoFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  updateProducto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductosActions.updateProducto),
      switchMap(({ producto }) =>
        this.productoApiService.update(producto.id, producto).pipe(
          map(updatedProducto => ProductosActions.updateProductoSuccess({ producto: updatedProducto })),
          catchError(error => {
            const errorMessage = this.getErrorMessage(error, 'actualizar el producto');
            return of(ProductosActions.updateProductoFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  deleteProducto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductosActions.deleteProducto),
      switchMap(({ id }) =>
        this.productoApiService.delete(id).pipe(
          map(() => ProductosActions.deleteProductoSuccess({ id })),
          catchError(error => {
            const errorMessage = this.getErrorMessage(error, 'eliminar el producto');
            return of(ProductosActions.deleteProductoFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  // Notificaciones de éxito
  showCreateSuccessMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductosActions.createProductoSuccess),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Producto Creado',
            detail: 'El producto se creó correctamente',
            life: 3000
          });
        })
      ),
    { dispatch: false }
  );

  showUpdateSuccessMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductosActions.updateProductoSuccess),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Producto Actualizado',
            detail: 'El producto se actualizó correctamente',
            life: 3000
          });
        })
      ),
    { dispatch: false }
  );

  showDeleteSuccessMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductosActions.deleteProductoSuccess),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Producto Eliminado',
            detail: 'El producto se eliminó correctamente',
            life: 3000
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private productoApiService: ProductoApiService,
    private messageService: MessageService
  ) {}

  /**
   * Extrae un mensaje de error legible desde el objeto de error HTTP
   */
  private getErrorMessage(error: any, action: string): string {
    // Error del servidor con mensaje específico
    if (error.error?.message) {
      return error.error.message;
    }

    // Error con mensaje directo
    if (error.message) {
      return error.message;
    }

    // Errores HTTP comunes
    if (error.status === 0) {
      return `No se pudo conectar con el servidor al intentar ${action}. Verifica tu conexión a internet.`;
    }

    if (error.status === 400) {
      return `Los datos enviados son inválidos. Por favor, verifica la información.`;
    }

    if (error.status === 404) {
      return `El recurso solicitado no fue encontrado.`;
    }

    if (error.status === 409) {
      return `El producto ya existe o hay un conflicto con los datos.`;
    }

    if (error.status === 422) {
      return `Los datos proporcionados no son válidos. Revisa los campos del formulario.`;
    }

    if (error.status === 500) {
      return `Error interno del servidor al intentar ${action}. Por favor, intenta nuevamente más tarde.`;
    }

    if (error.status === 503) {
      return `El servicio no está disponible temporalmente. Intenta nuevamente en unos momentos.`;
    }

    // Error genérico
    return `Ocurrió un error al intentar ${action}. Por favor, intenta nuevamente.`;
  }
}