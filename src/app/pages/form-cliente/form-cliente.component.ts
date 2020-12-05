import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/general.service';
import { Lista } from '../../models/lista';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent implements OnInit {

  formCliente: FormGroup = new FormGroup({});
  idCliente: number = null;
  tiposDeDocumento: Lista[] = [{ id: 1, nombre: 'C.C' }, { id: 2, nombre: 'Pasaporte' }];
  departamentos: Lista[] = [{ id: 1, nombre: 'Huila' }, { id: 2, nombre: 'Ibague' }];
  municipios: Lista[] = [{ id: 1, nombre: 'Neiva' }, { id: 2, nombre: 'Aipe' }];
  tipoDocSelected = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private generalService: GeneralService
  )
  {
    this.obtenerIdCliente();
  }

  ngOnInit(): void {
    this.createForm();
  }

  probando(event): void {
    console.log('EVENTO: ', event);
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
    this.route.params.subscribe((param) => this.idCliente = Number(param.id) );
  }

  cargarInfoCliente(): void {
    this.formCliente.setValue({
      nombres: 'Germán David Aviles Paipa',
      tipoDocumento: 2,
      numeroDocumento: 1075311762,
      departmento: 2,
      municipio: 1,
      direccion: 'Calle 47 # 8 - 63P',
      email: 'german.aviles06@hotmail.com',
      telefone: 3163761560
    });
  }

  cargarListas(): void {

  }

  guardarCliente(): void {
    console.log('VALIDO: ', this.formCliente.valid);
    console.log('FOM: ', this.formCliente);
    console.log('==>', this.formCliente.controls.tipoDocumento.hasError( 'required' ) );
    // if ( !this.formCliente.valid ) {
    //   return;
    // }
    // const request = this.formCliente.getRawValue();
    // Swal.fire({title: 'Perfecto', icon: 'success', text: 'El cliente ha sido creado con éxito'});
    // this.router.navigate(['home']);
    // this.formCliente.reset();
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
