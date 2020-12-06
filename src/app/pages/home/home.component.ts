import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { GeneralService } from '../../general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clientes: Cliente[];

  constructor( private router: Router, private generalService: GeneralService ) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  formCliente( idCliente: number = null ): void {
    if (idCliente) {
      this.router.navigate(['edit', idCliente]);
    } else {
      this.router.navigate(['create']);
    }
  }

  cargarClientes(): void {
    this.clientes = [
      {
        id: 1234,
        nombres: 'Germán David Aviles Paipa',
        tipoDocumento: 'C.C',
        numeroDocumento: 1075311762,
        departmento: 'Huila',
        municipio: 'Neiva',
        direccion: 'Calle 47 # 8 - 63P',
        email: 'german.aviles06@hotmail.com',
        telefone: 3163761560
      }
    ];
    // TODO: crear sevicio HTTP
    // this.generalService
  }

  async eliminarCliente( idCliente: number ): Promise<any> {
    const respuesta = await this.confirmacionEliminacion();
    if (respuesta) {
      console.log('ACEPTO: ', respuesta);
    }
  }

  confirmacionEliminacion(): Promise<any> {
    return new Promise( (resolve, reject) => {

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success mr-3',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });

      return swalWithBootstrapButtons.fire({
        title: 'Atención!',
        text: '¿Estas seguro que deseas eliminar este cliente?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        return resolve(result.isConfirmed);
      });
    });
  }

}
