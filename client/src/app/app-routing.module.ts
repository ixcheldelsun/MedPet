import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaRegistroComponent } from './components/ficha-registro/ficha-registro.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { VacunaComponent } from './components/vacuna/vacuna.component';
import { EscogerMascotaComponent } from './components/escoger-mascota/escoger-mascota.component';
import { CeloComponent } from './components/celo/celo.component';
import { DetallesMascotaComponent } from './components/detalles-mascota/detalles-mascota.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DesparasitacionComponent } from './components/desparasitacion/desparasitacion.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { ObservacionComponent } from './components/observacion/observacion.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service'


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuardService] },
  { path: 'nueva-mascota', component: FichaRegistroComponent, canActivate: [AuthGuardService] },
  { path: 'vacuna', component: VacunaComponent, canActivate: [AuthGuardService] },
  { path: 'escoger-mascota', component: EscogerMascotaComponent, canActivate: [AuthGuardService] },
  { path: 'celo', component: CeloComponent, canActivate: [AuthGuardService] },
  { path: 'detalle-mascota', component: DetallesMascotaComponent, canActivate: [AuthGuardService] },
  { path: 'calendario', component: CalendarComponent, canActivate: [AuthGuardService]},
  { path: 'desparasitacion', component: DesparasitacionComponent, canActivate: [AuthGuardService] },
  { path: 'consulta', component: ConsultaComponent, canActivate: [AuthGuardService] },
  { path: 'observacion', component: ObservacionComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService, AuthService]
})
export class AppRoutingModule { }
