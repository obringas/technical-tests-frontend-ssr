import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Producto, CreateProductoDto, UpdateProductoDto } from '../../models/producto.model';
import * as ProductosActions from '../../store/productos.actions';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.scss']
})
export class ProductoFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() producto: Producto | null | undefined;
  @Input() isEditMode = false;
  @Input() loading: boolean = false;
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  
  productoForm!: FormGroup;
  
  categorias = [
    { label: 'Electrónica', value: 'Electrónica' },
    { label: 'Ropa', value: 'Ropa' },
    { label: 'Alimentos', value: 'Alimentos' },
    { label: 'Hogar', value: 'Hogar' },
    { label: 'Deportes', value: 'Deportes' },
    { label: 'Otros', value: 'Otros' }
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['producto'] && this.productoForm) {
      if (this.producto) {
        this.productoForm.patchValue(this.producto);
      } else {
        this.productoForm.reset({
          activo: true,
          stock: 0,
          precio: 0
        });
      }
    }
  }

  private initForm(): void {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      activo: [true]
    });

    if (this.producto) {
      this.productoForm.patchValue(this.producto);
    }
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const formValue = this.productoForm.value;

    if (this.isEditMode && this.producto) {
      const updateDto: UpdateProductoDto = {
        id: this.producto.id,
        ...formValue
      };
      this.store.dispatch(ProductosActions.updateProducto({ producto: updateDto }));
    } else {
      const createDto: CreateProductoDto = formValue;
      this.store.dispatch(ProductosActions.createProducto({ producto: createDto }));
    }

    // NO emitir saved aquí, dejar que el padre lo maneje con el success
  }

  onCancel(): void {
    this.productoForm.reset({
      activo: true,
      stock: 0,
      precio: 0
    });
    this.cancel.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productoForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.productoForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Este campo es requerido';
    if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['maxlength']) return `Máximo ${field.errors['maxlength'].requiredLength} caracteres`;
    if (field.errors['min']) return `El valor mínimo es ${field.errors['min'].min}`;

    return '';
  }

  getFormCompletionPercentage(): number {
    const controls = Object.keys(this.productoForm.controls);
    const validControls = controls.filter(key => this.productoForm.get(key)?.valid).length;
    return Math.round((validControls / controls.length) * 100);
  }

  showPreview(): boolean {
    return this.productoForm.get('nombre')?.value && 
           this.productoForm.get('precio')?.value >= 0;
  }

  getStockIndicatorIcon(): string {
    const stock = this.productoForm.get('stock')?.value || 0;
    if (stock > 50) return 'pi pi-check-circle stock-high';
    if (stock > 10) return 'pi pi-exclamation-triangle stock-medium';
    return 'pi pi-times-circle stock-low';
  }

  getStockIndicatorText(): string {
    const stock = this.productoForm.get('stock')?.value || 0;
    if (stock > 50) return 'Stock alto';
    if (stock > 10) return 'Stock medio';
    if (stock > 0) return 'Stock bajo';
    return 'Sin stock';
  }

  ngOnDestroy(): void {
    if (this.productoForm) {
      this.productoForm.reset();
    }
  }
}
