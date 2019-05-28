import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaRegistroComponent } from './components/ficha-registro/ficha-registro.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service'


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuardService] },
  { path: 'nueva-mascota', component: FichaRegistroComponent, canActivate: [AuthGuardService] },
  { path: 'home', component: HomeComponent },
  { path: 'footer', component: FooterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService, AuthService]
})
export class AppRoutingModule { }
