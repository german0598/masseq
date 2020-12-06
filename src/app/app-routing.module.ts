import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FormClienteComponent } from './pages/form-cliente/form-cliente.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeGuard } from './auth/home.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [ HomeGuard ] },
  { path: 'login', component: LoginComponent, canActivate: [ AuthGuard ] },
  { path: 'create', component: FormClienteComponent, canActivate: [ HomeGuard ] },
  { path: 'edit/:id', component: FormClienteComponent, canActivate: [ HomeGuard ] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
