import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Producto } from '../../models/producto.model';
import * as ProductosActions from '../../store/productos.actions';
import * as ProductosSelectors from '../../store/productos.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { ConfirmationService } from 'primeng/api';
import {  MessageService } from 'primeng/api';  // ⚠️ AGREGAR MessageService

@Component({
  selector: 'app-productos-page',
  templateUrl: './productos-page.component.html',
  styleUrls: ['./productos-page.component.scss']
})
export class ProductosPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  productos$: Observable<Producto[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  selectedProducto$: Observable<Producto | null | undefined>;
  
  displayDialog = false;
  isEditMode = false;

  constructor(
    private store: Store,
    private actions$: Actions,
    private confirmationService: ConfirmationService
    , private messageService: MessageService  // ⚠️ INYECTAR MessageService
  ) {
    this.productos$ = this.store.select(ProductosSelectors.selectAllProductos);
    this.loading$ = this.store.select(ProductosSelectors.selectProductosLoading);
    this.error$ = this.store.select(ProductosSelectors.selectProductosError);
    this.selectedProducto$ = this.store.select(ProductosSelectors.selectSelectedProducto);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductosActions.loadProductos());
    
    // Cerrar dialog al crear exitosamente
    this.actions$.pipe(
      ofType(ProductosActions.createProductoSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.displayDialog = false;
      this.store.dispatch(ProductosActions.clearSelection());
    });

    // Cerrar dialog al actualizar exitosamente
    this.actions$.pipe(
      ofType(ProductosActions.updateProductoSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.displayDialog = false;
      this.store.dispatch(ProductosActions.clearSelection());
    });
  }

  onCreateProducto(): void {
    this.isEditMode = false;
    this.store.dispatch(ProductosActions.clearSelection());
    this.displayDialog = true;
  }

  onEditProducto(producto: Producto): void {
    this.isEditMode = true;
    this.store.dispatch(ProductosActions.selectProducto({ producto }));
    this.displayDialog = true;
  }

  onDeleteProducto(id: number): void {
  console.log('🗑️ Eliminar producto ID:', id);
  
  this.productos$.pipe(take(1)).subscribe(productos => {
    const producto = productos.find(p => p.id === id);
    const productoNombre = producto?.nombre || 'este producto';
    
    console.log('📋 Mostrando confirmación para:', productoNombre);
    
    this.confirmationService.confirm({
      header: 'Eliminar Producto',
      message: `
        <div class="confirm-delete-content">
          <div class="confirm-icon-wrapper">
            <i class="pi pi-exclamation-triangle"></i>
          </div>
          <div class="confirm-message">
            <h3>¿Estás seguro?</h3>
            <p>Estás a punto de eliminar el producto:</p>
            <p class="product-name">"${productoNombre}"</p>
            <p class="warning-text">Esta acción no se puede deshacer.</p>
          </div>
        </div>
      `,
      icon: 'none',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-danger p-button-raised',
      rejectButtonStyleClass: 'p-button-text p-button-secondary',
      defaultFocus: 'reject',
      accept: () => {
        console.log('✅ Usuario confirmó eliminación');
        this.store.dispatch(ProductosActions.deleteProducto({ id }));
      },
      reject: () => {
        console.log('❌ Usuario canceló eliminación');
      }
    });
  });
}

  onDialogHide(): void {
    this.displayDialog = false;
    this.store.dispatch(ProductosActions.clearSelection());
  }

  onProductoSaved(): void {
    // Método para mantener compatibilidad
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(ProductosActions.clearSelection());
  }
}