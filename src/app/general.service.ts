import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './models/cliente';
import { Lista } from './models/lista';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public $loginUser: EventEmitter<any>;
  public tiposDeDocumento: Lista[] = [{ id: 1, nombre: 'C.C.' }, { id: 2, nombre: 'Pasaporte' }];
  public departamentos: Lista[] = [{ id: 1, nombre: 'Huila' }, { id: 2, nombre: 'Ibague' }];
  public municipios: Lista[] = [{ id: 1, nombre: 'Neiva' }, { id: 2, nombre: 'Aipe' }];

  constructor( private http: HttpClient ) {
    this.$loginUser = new EventEmitter();
    const token = localStorage.getItem('token_user');
    if (token) {
      this.$loginUser.emit(true);
    } else {
      this.$loginUser.emit(false);
    }
  }

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

  getClientes(): Cliente[] {
    return [
      {
        id: 1234,
        nombres: 'Germán David Aviles Paipa',
        tipoDocumento: 'C.C.',
        numeroDocumento: 107531233,
        departmento: 'Huila',
        municipio: 'Neiva',
        direccion: 'Calle 47 # 8 - 63P',
        email: 'german.aviles06@hotmail.com',
        telefone: 3163761560
      },
      {
        id: 98,
        nombres: 'Daniel Felipe Murcia',
        tipoDocumento: 'C.C.',
        numeroDocumento: 1009833,
        departmento: 'Huila',
        municipio: 'Neiva',
        direccion: 'Calle 47 # 8 - 63P',
        email: 'Daniel@gmail.com',
        telefone: 3148990989
      },
      {
        id: 939,
        nombres: 'Paula Lozano Suarez',
        tipoDocumento: 'C.C.',
        numeroDocumento: 103139993,
        departmento: 'Huila',
        municipio: 'Neiva',
        direccion: 'Calle 47 # 8 - 63P',
        email: 'paula@hotmail.com',
        telefone: 3092012323
      }
    ];
  }

  getCliente(idCliente): Cliente {

    const clientes = this.getClientes();
    const cliente: Cliente = clientes.find( (clien: Cliente) => clien.id === idCliente);
    cliente.departmento = this.getIdLista('departmento', cliente.departmento);
    cliente.municipio = this.getIdLista('municipio', cliente.municipio);
    cliente.tipoDocumento = this.getIdLista('tipoDocumento', cliente.tipoDocumento);

    return cliente;
  }

  getIdLista( lista, nombre ): string {
    let elemento = null;
    if (lista === 'departmento') {
      elemento = this.departamentos.find( (item) => item.nombre === nombre);
    } else if (lista === 'municipio') {
      elemento = this.municipios.find( (item) => item.nombre === nombre);
    } else {
      elemento = this.tiposDeDocumento.find( (item) => item.nombre === nombre);
    }
    return elemento.id;
  }
}
