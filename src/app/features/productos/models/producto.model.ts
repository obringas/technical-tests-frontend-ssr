export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  activo: boolean;
  fechaCreacion?: Date;
}

export interface CreateProductoDto {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  activo: boolean;
}

export interface UpdateProductoDto extends CreateProductoDto {
  id: number;
}