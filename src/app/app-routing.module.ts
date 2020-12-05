import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FormClienteComponent } from './pages/form-cliente/form-cliente.component';

const routes: Routes = [
  // { path: '', pathMatch: 'home', redirectTo: 'home', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: FormClienteComponent },
  { path: 'edit/:id', component: FormClienteComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
