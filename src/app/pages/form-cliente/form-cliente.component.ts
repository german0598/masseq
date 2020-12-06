import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/general.service';
import { Lista } from '../../models/lista';
import Swal from 'sweetalert2';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent implements OnInit {

  formCliente: FormGroup = new FormGroup({});
  idCliente: number = null;
  tiposDeDocumento: Lista[];
  departamentos: Lista[];
  municipios: Lista[];
  tipoDocSelected = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private generalService: GeneralService
  )
  {
    this.obtenerIdCliente();
    this.cargarListas();
  }

  ngOnInit(): void {
    this.createForm();
  }

  cargarListas(): void {
    this.tiposDeDocumento = this.generalService.tiposDeDocumento;
    this.departamentos = this.generalService.departamentos;
    this.municipios = this.generalService.municipios;
  }

  createForm(): void{
    this.formCliente = this.formBuilder.group({
      nombres: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      departmento: ['', Validators.required],
      municipio: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required]
    });

    if (this.idCliente) {
      this.cargarInfoCliente();
    }
  }

  regresar(): void{
    this.router.navigate(['home']);
    this.formCliente.reset();
  }

  obtenerIdCliente(): void{
    this.route.params.subscribe((param) => {
      this.idCliente = param.id ? Number(param.id) : null;
    });
  }

  cargarInfoCliente(): void {
    // this.generalService.obtenerUnCliente( this.idCliente ).subscribe( (cliente: Cliente) => {
    //   this.formCliente.setValue({
    //     nombres: cliente.nombres,
    //     tipoDocumento: cliente.tipoDocumento,
    //     numeroDocumento: cliente.numeroDocumento,
    //     departmento: cliente.departmento,
    //     municipio: cliente.municipio,
    //     direccion: cliente.direccion,
    //     email: cliente.email,
    //     telefone: cliente.telefone
    //   });
    // });
    const cliente = this.generalService.getCliente( this.idCliente );
    this.formCliente.setValue({
      nombres: cliente.nombres,
      tipoDocumento: cliente.tipoDocumento,
      numeroDocumento: cliente.numeroDocumento,
      departmento: cliente.departmento,
      municipio: cliente.municipio,
      direccion: cliente.direccion,
      email: cliente.email,
      telefone: cliente.telefone
    });
  }

  cargarMunicipios( event ): void {
    console.log('CARGAR MUNICIPIOS: ', event.target.value);
  }

  guardarCliente(): void {
    if ( !this.formCliente.valid ) {
      Swal.fire({
        title: 'Atención',
        icon: 'error',
        text: 'Por favor complete todos los campos antes de guardar'
      });
      return;
    }
    const request = this.formCliente.getRawValue();
    this.generalService.guardarCliente( request, this.idCliente ).subscribe( () => {
      this.router.navigate(['home']);
      this.formCliente.reset();
      Swal.fire({
        title: 'Perfecto',
        icon: 'success',
        text: 'El cliente ha sido creado con éxito'
      });
    });
  }

  mostrarErrorInput( control: string ): boolean {
    let valido = false;

    const error = this.formCliente.controls[control].errors;
    const tocado = this.formCliente.controls[control].touched;
    const valorDefecto = this.formCliente.controls[control].pristine;

    if (error && valorDefecto && !tocado) {
      valido = true;
    }

    if (error && !valorDefecto && !tocado) {
      valido = true;
    }

    if (!error) {
      valido = true;
    }
    return valido;
  }

}
