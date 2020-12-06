import { Component } from '@angular/core';
import { GeneralService } from './general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'masseq';
  userLoged = false;

  constructor( private generalService: GeneralService ){
    this.generalService.$loginUser.subscribe((logueado: boolean) => {
      this.userLoged = logueado;
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('token_user');
    location.reload();
    this.generalService.$loginUser.emit(false);
  }
}
