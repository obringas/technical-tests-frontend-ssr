import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ITableConfig, ITableColumn, ITableButton, ColumnType } from '../../models/table.model';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GenericTableComponent {
  @Input() config!: ITableConfig;
  @Input() loading: boolean = false;
  
  @Output() rowSelect = new EventEmitter<any>();
  @Output() lazyLoad = new EventEmitter<any>();

  @ContentChild('customCell', { static: false }) customCellTemplate?: TemplateRef<any>;

  ColumnType = ColumnType;

  get hasFilterableColumns(): boolean {
    return this.config?.columns?.some(col => col.filterable) ?? false;
  }

  onRowSelect(rowData: any): void {
    this.rowSelect.emit(rowData);
  }

  onLazyLoad(event: any): void {
    this.lazyLoad.emit(event);
  }

  getCellValue(rowData: any, column: ITableColumn): any {
    const keys = column.field.split('.');
    let value = rowData;
    
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined || value === null) {
        return '-';
      }
    }
    
    return value;
  }

  shouldShowButton(button: ITableButton, rowData: any): boolean {
    if (button.visible) {
      return button.visible(rowData);
    }
    return true;
  }

  getAlignClass(align?: string): string {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  }
  onButtonClick(button: ITableButton, rowData: any, event: Event): void {
    console.log('🔘 generic-table: Button clicked', {
      tooltip: button.tooltip,
      rowData: rowData,
      hasAction: !!button.action
    });
    
    event.stopPropagation();
    
    if (button.action) {
      console.log('✅ generic-table: Executing button action');
      button.action(rowData);
    } else {
      console.error('❌ generic-table: Button has no action!');
    }
  }
}