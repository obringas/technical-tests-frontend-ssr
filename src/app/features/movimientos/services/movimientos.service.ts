import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimiento, CreateMovimientoDto } from '../models/movimiento.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimientoApiService {
  private readonly apiUrl = `${environment.apiUrl}/movimientos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.apiUrl);
  }

  getById(id: number): Observable<Movimiento> {
    return this.http.get<Movimiento>(`${this.apiUrl}/${id}`);
  }

  getByProducto(productoId: number): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(`${this.apiUrl}/producto/${productoId}`);
  }

  create(movimiento: CreateMovimientoDto): Observable<Movimiento> {
    return this.http.post<Movimiento>(this.apiUrl, movimiento);
  }
}