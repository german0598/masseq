import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './models/cliente';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor( private http: HttpClient ) { }

  cargarClientes(): Observable<any> {
    return this.http.get('');
  }

  guardarCliente( cliente: Cliente, idCliente: number = null ): Observable<any> {
    if (idCliente) {
      return this.http.put('', cliente);
    }
    return this.http.post('', cliente);
  }

  obtenerUnCliente( idCliente: number ): Observable<any> {
    return this.http.get('');
  }

  eliminarCliente( idCliente: number ): Observable<any>{
    return this.http.delete('');
  }

  obtenerMunicipios( idDepartamento: number ): Observable<any> {
    return this.http.get('');
  }

  iniciarSesion( usuario ): Observable<any> {
    return this.http.post('', usuario);
  }
}
