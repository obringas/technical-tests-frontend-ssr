export enum TipoMovimiento {
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA',
  AJUSTE = 'AJUSTE',
  DEVOLUCION = 'DEVOLUCION'
}


export interface Movimiento {
  id: number;
  productoId: number;
  productoNombre?: string;
  tipo: TipoMovimiento;
  cantidad: number;
  stockAnterior: number;
  stockNuevo: number;
  motivo: string;
  fecha: Date;
  usuario?: string;
}

export interface CreateMovimientoDto {
  productoId: number;
  tipo: TipoMovimiento;
  cantidad: number;
  motivo: string;
}

// Modelo del formulario para ngrx-forms
export interface MovimientoFormValue {
  productoId: number | null;
  tipo: TipoMovimiento | null;
  cantidad: number | null;
  motivo: string;
}