import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FichaRegistroComponent } from './components/ficha-registro/ficha-registro.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'nueva-mascota', component: FichaRegistroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'footer', component: FooterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
