import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { MovimientoApiService } from '../services/movimientos.service';

import * as MovimientosActions from './movimientos.actions';
import * as ProductosActions from '../../productos/store/productos.actions';
import { MessageService } from 'primeng/api';
import { selectMovimientoFormValue } from './movimientos.selectors';

@Injectable()
export class MovimientosEffects {
  
  loadMovimientos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovimientosActions.loadMovimientos),
      switchMap(() =>
        this.movimientosService.getAll().pipe(
          map(movimientos => MovimientosActions.loadMovimientosSuccess({ movimientos })),
          catchError(error => {
            const errorMessage = this.getErrorMessage(error, 'cargar los movimientos');
            return of(MovimientosActions.loadMovimientosFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  createMovimiento$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovimientosActions.createMovimiento),
      withLatestFrom(this.store.select(selectMovimientoFormValue)),
      switchMap(([{ movimiento }, formState]) =>
        this.movimientosService.create(movimiento).pipe(
          map(newMovimiento => MovimientosActions.createMovimientoSuccess({ movimiento: newMovimiento })),
          catchError(error => {
            const errorMessage = this.getErrorMessage(error, 'registrar el movimiento');
            return of(MovimientosActions.createMovimientoFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  // Recargar productos después de un movimiento exitoso
  reloadProductosAfterMovimiento$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovimientosActions.createMovimientoSuccess),
      map(() => ProductosActions.loadProductos())
    )
  );

  showCreateSuccessMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MovimientosActions.createMovimientoSuccess),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Movimiento Registrado',
            detail: 'El movimiento se registró correctamente',
            life: 3000
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private movimientosService: MovimientoApiService,
    private messageService: MessageService
  ) {}

  private getErrorMessage(error: any, action: string): string {
    if (error.error?.message) return error.error.message;
    if (error.message) return error.message;
    if (error.status === 0) {
      return `No se pudo conectar con el servidor al intentar ${action}.`;
    }
    if (error.status === 400) {
      return `Los datos enviados son inválidos.`;
    }
    if (error.status === 404) {
      return `El recurso no fue encontrado.`;
    }
    if (error.status === 500) {
      return `Error interno del servidor al intentar ${action}.`;
    }
    return `Ocurrió un error al intentar ${action}.`;
  }
}