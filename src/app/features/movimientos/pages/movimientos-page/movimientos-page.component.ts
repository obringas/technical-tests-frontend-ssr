import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { Movimiento } from '../../models/movimiento.model';
import * as MovimientosActions from '../../store/movimientos.actions';
import * as MovimientosSelectors from '../../store/movimientos.selectors';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-movimientos-page',
  templateUrl: './movimientos-page.component.html',
  styleUrls: ['./movimientos-page.component.scss']
})
export class MovimientosPageComponent implements OnInit, OnDestroy {
  movimientos$: Observable<Movimiento[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  stats$: Observable<any>;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private messageService: MessageService
  ) {
    this.movimientos$ = this.store.select(MovimientosSelectors.selectAllMovimientos);
    this.loading$ = this.store.select(MovimientosSelectors.selectMovimientosLoading);
    this.error$ = this.store.select(MovimientosSelectors.selectMovimientosError);
    this.stats$ = this.store.select(MovimientosSelectors.selectMovimientosStats);
  }

  ngOnInit(): void {
    this.store.dispatch(MovimientosActions.loadMovimientos());

    // Manejo de errores
    this.error$.pipe(
      takeUntil(this.destroy$),
      filter(error => error !== null)
    ).subscribe(error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error || 'Ocurrió un error inesperado',
        life: 5000
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}