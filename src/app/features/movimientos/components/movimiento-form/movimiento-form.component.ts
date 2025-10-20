import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TipoMovimiento } from '../../models/movimiento.model';
import { Producto } from '../../../productos/models/producto.model';
import * as MovimientosActions from '../../store/movimientos.actions';
import * as MovimientosSelectors from '../../store/movimientos.selectors';
import * as ProductosSelectors from '../../../productos/store/productos.selectors';
import * as ProductosActions from '../../../productos/store/productos.actions';
import { Actions, ofType } from '@ngrx/effects';
@Component({
  selector: 'app-movimiento-form',
  templateUrl: './movimiento-form.component.html',
  styleUrls: ['./movimiento-form.component.scss']
})
export class MovimientoFormComponent implements OnInit, OnDestroy {
  movimientoForm!: FormGroup;
  productos$: Observable<Producto[]>;
  loading$: Observable<boolean>;

  // Propiedades para AutoComplete
  productoSeleccionado: Producto | null = null;
  productosFiltrados: Producto[] = [];
  todosLosProductos: Producto[] = [];

  tiposMovimiento = [
    { label: 'Entrada', value: TipoMovimiento.ENTRADA, icon: 'pi-arrow-down', color: 'success' },
    { label: 'Salida', value: TipoMovimiento.SALIDA, icon: 'pi-arrow-up', color: 'danger' },
    { label: 'Ajuste', value: TipoMovimiento.AJUSTE, icon: 'pi-sliders-h', color: 'warning' },
    { label: 'Devolución', value: TipoMovimiento.DEVOLUCION, icon: 'pi-replay', color: 'info' }
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private actions$: Actions
  ) {
    this.productos$ = this.store.select(ProductosSelectors.selectAllProductos);
    this.loading$ = this.store.select(MovimientosSelectors.selectMovimientosLoading);
  }

  ngOnInit(): void {
    // Inicializar formulario
    this.movimientoForm = this.fb.group({
      productoId: [null, Validators.required],
      tipo: [null, Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      motivo: ['', Validators.required]
    });

    // Cargar productos
    this.store.dispatch(ProductosActions.loadProductos());

    // Guardar productos localmente para el autocomplete
    this.productos$.pipe(takeUntil(this.destroy$)).subscribe(productos => {
      this.todosLosProductos = productos;
    });
     
    // Limpiar formulario cuando se crea exitosamente
    this.actions$.pipe(
      ofType(MovimientosActions.createMovimientoSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.onReset(); // Llamamos al método que ya tienes para limpiar
    });
    // Limpiar formulario cuando se crea exitosamente
    this.store.select(MovimientosSelectors.selectMovimientoFormValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe(formValue => {
        if (!formValue.productoId && !formValue.tipo) {
          this.movimientoForm.reset();
          this.productoSeleccionado = null;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Método para buscar productos (AutoComplete)
  buscarProducto(event: any): void {
    const query = event.query.toLowerCase();
    
    if (!query) {
      this.productosFiltrados = [...this.todosLosProductos];
      return;
    }

    this.productosFiltrados = this.todosLosProductos.filter(producto =>
      producto.nombre.toLowerCase().includes(query) ||
      producto.categoria.toLowerCase().includes(query)
    );
  }

  // Método cuando se selecciona un producto
onProductoSeleccionado(event: any): void {
  const producto = event?.value || event;
  if (producto && producto.id) {
    this.movimientoForm.patchValue({ productoId: producto.id });
  }
}
  onSubmit(): void {
    if (this.movimientoForm.valid) {
      const formValue = this.movimientoForm.value;
      this.store.dispatch(
        MovimientosActions.createMovimiento({
          movimiento: {
            productoId: formValue.productoId,
            tipo: formValue.tipo,
            cantidad: formValue.cantidad,
            motivo: formValue.motivo
          }
        })
      );
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.movimientoForm.controls).forEach(key => {
        this.movimientoForm.get(key)?.markAsTouched();
      });
    }
  }

  onReset(): void {
    this.movimientoForm.reset();
    this.productoSeleccionado = null;
    this.store.dispatch(MovimientosActions.resetMovimientoForm());
  }

  selectTipo(tipo: TipoMovimiento): void {
    this.movimientoForm.patchValue({ tipo });
  }

  get productoId() { return this.movimientoForm.get('productoId'); }
  get tipo() { return this.movimientoForm.get('tipo'); }
  get cantidad() { return this.movimientoForm.get('cantidad'); }
  get motivo() { return this.movimientoForm.get('motivo'); }
}