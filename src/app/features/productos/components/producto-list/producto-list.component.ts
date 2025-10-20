import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { Producto } from '../../models/producto.model';
import { ITableConfig, ITableColumn, ColumnType, ColumnAlign } from '../../../../shared/models/table.model';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss'],
  animations: [
    trigger('rowAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class ProductoListComponent implements OnChanges, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() productos: Producto[] | null = [];
  @Input() loading: boolean | null = false;
  @Output() edit = new EventEmitter<Producto>();
  @Output() delete = new EventEmitter<number>();

  searchValue: string = '';
  selectedCategory: string = '';
  tableConfig!: ITableConfig;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productos'] || changes['loading']) {
      this.setupTable();
    }
  }

  private setupTable(): void {
    const columns: ITableColumn[] = [
      {
        field: 'id',
        header: '#',
        type: ColumnType.numeric,
        align: ColumnAlign.center,
        width: '80px',
        sortable: true
      },
      {
        field: 'nombre',
        header: 'Producto',
        type: ColumnType.text,
        sortable: true,
        filterable: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        type: ColumnType.text,
        sortable: false
      },
      {
        field: 'precio',
        header: 'Precio',
        type: ColumnType.currency,
        align: ColumnAlign.right,
        width: '140px',
        sortable: true
      },
      {
        field: 'stock',
        header: 'Stock',
        type: ColumnType.numeric,
        align: ColumnAlign.center,
        width: '120px',
        sortable: true
      },
      {
        field: 'categoria',
        header: 'Categoría',
        type: ColumnType.text,
        align: ColumnAlign.center,
        width: '150px',
        sortable: true
      },
      {
        field: 'activo',
        header: 'Estado',
        type: ColumnType.badge,
        align: ColumnAlign.center,
        width: '120px',
        sortable: true,
        badgeConfig: {
          getValue: (row: Producto) => row.activo ? 'Activo' : 'Inactivo',
          getSeverity: (row: Producto) => row.activo ? 'success' : 'danger'
        }
      },
      {
        field: 'actions',
        header: 'Acciones',
        type: ColumnType.buttons,
        align: ColumnAlign.center,
        width: '140px',
        buttons: [
          {
            icon: 'pi pi-pencil',
            class: 'p-button-rounded p-button-success p-button-text',
            tooltip: 'Editar producto',
            action: (producto: Producto) => this.onEdit(producto)
          },
          {
            icon: 'pi pi-trash',
            class: 'p-button-rounded p-button-danger p-button-text',
            tooltip: 'Eliminar producto',
            action: (producto: Producto) => this.onDelete(producto)
          }
        ]
      }
    ];

    this.tableConfig = {
      columns,
      data: this.getFilteredProducts(),
      loading: this.loading ?? false,
      paginator: true,
      rows: 10,
      showCurrentPageReport: true,
      rowsPerPageOptions: [10, 25, 50, 100],
      emptyMessage: this.searchValue || this.selectedCategory 
        ? 'No se encontraron productos con los filtros aplicados' 
        : 'No hay productos registrados'
    };
  }

  onEdit(producto: Producto): void {
    this.edit.emit(producto);
  }

  onDelete(producto: Producto): void {
    // Solo emitir el ID, la confirmación la maneja el padre
    this.delete.emit(producto.id);
  }

  clearFilters(): void {
    this.searchValue = '';
    this.selectedCategory = '';
    this.setupTable();
  }

  onFilterChange(): void {
    this.setupTable();
  }

  getFilteredProducts(): Producto[] {
    if (!this.productos) return [];
    
    let filtered = [...this.productos];

    if (this.searchValue) {
      filtered = filtered.filter(p => 
        p.nombre.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        p.categoria.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.categoria === this.selectedCategory);
    }

    return filtered;
  }

  getCategorias(): string[] {
    if (!this.productos) return [];
    return [...new Set(this.productos.map(p => p.categoria))];
  }

  getTotalProductos(): number {
    return this.productos?.length || 0;
  }

  getValorInventario(): number {
    if (!this.productos) return 0;
    return this.productos.reduce((total, p) => total + (p.precio * p.stock), 0);
  }

  getProductosActivos(): number {
    return this.productos?.filter(p => p.activo).length || 0;
  }

  getPercentajeActivos(): number {
    const total = this.getTotalProductos();
    if (total === 0) return 0;
    return Math.round((this.getProductosActivos() / total) * 100);
  }

  getStockTotal(): number {
    if (!this.productos) return 0;
    return this.productos.reduce((total, p) => total + p.stock, 0);
  }

  getStockClass(stock: number): string {
    if (stock > 50) return 'stock-high';
    if (stock > 10) return 'stock-medium';
    return 'stock-low';
  }

  getStockIcon(stock: number): string {
    if (stock > 50) return 'pi pi-check-circle';
    if (stock > 10) return 'pi pi-exclamation-triangle';
    return 'pi pi-times-circle';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}