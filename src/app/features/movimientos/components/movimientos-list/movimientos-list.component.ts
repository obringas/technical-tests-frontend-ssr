import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Movimiento, TipoMovimiento } from '../../models/movimiento.model';
import { ITableConfig, ITableColumn, ColumnType, ColumnAlign } from '../../../../shared/models/table.model';

@Component({
  selector: 'app-movimientos-list',
  templateUrl: './movimientos-list.component.html',
  styleUrls: ['./movimientos-list.component.scss']
})
export class MovimientosListComponent implements OnChanges {
  @Input() movimientos: Movimiento[] | null = [];
  @Input() loading: boolean = false;

  tableConfig!: ITableConfig;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movimientos'] || changes['loading']) {
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
        field: 'productoNombre',
        header: 'Producto',
        type: ColumnType.text,
        sortable: true,
        filterable: true
      },
      {
        field: 'tipo',
        header: 'Tipo',
        type: ColumnType.badge,
        align: ColumnAlign.center,
        width: '150px',
        sortable: true,
        badgeConfig: {
          getValue: (row: Movimiento) => row.tipo,
          getSeverity: (row: Movimiento) => this.getTipoSeverity(row.tipo)
        }
      },
      {
        field: 'cantidad',
        header: 'Cantidad',
        type: ColumnType.numeric,
        align: ColumnAlign.center,
        width: '120px',
        sortable: true
      },
      {
        field: 'stockAnterior',
        header: 'Stock Anterior',
        type: ColumnType.numeric,
        align: ColumnAlign.center,
        width: '130px'
      },
      {
        field: 'stockNuevo',
        header: 'Stock Nuevo',
        type: ColumnType.numeric,
        align: ColumnAlign.center,
        width: '130px'
      },
      {
        field: 'motivo',
        header: 'Motivo',
        type: ColumnType.text,
        filterable: true
      },
      {
        field: 'fecha',
        header: 'Fecha',
        type: ColumnType.datetime,
        width: '180px',
        sortable: true
      }
    ];

    this.tableConfig = {
      columns,
      data: this.movimientos || [],
      loading: this.loading,
      paginator: true,
      rows: 10,
      showCurrentPageReport: true,
      rowsPerPageOptions: [10, 25, 50],
      emptyMessage: 'No hay movimientos registrados'
    };
  }

  private getTipoSeverity(tipo: string): 'success' | 'info' | 'warning' | 'danger' {
    switch (tipo) {
      case TipoMovimiento.ENTRADA:
        return 'success';
      case TipoMovimiento.SALIDA:
        return 'danger';
      case TipoMovimiento.AJUSTE:
        return 'warning';
      case TipoMovimiento.DEVOLUCION:
        return 'info';
      default:
        return 'info';
    }
  }
}