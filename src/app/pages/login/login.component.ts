import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});

  constructor( private formBuilder: FormBuilder, private generalService: GeneralService ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.formLogin = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(): void {
    if (!this.formLogin.valid) {
      Swal.fire({
        title: 'Atención',
        icon: 'error',
        text: 'Usuario y contraseña requeridos',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    const values = this.formLogin.getRawValue();
    this.generalService.iniciarSesion( values );
    localStorage.setItem('token_user', JSON.stringify(values) );
  }

}
