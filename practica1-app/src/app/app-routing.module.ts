import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//new components
import { LoginComponent } from "./components/account/login/login.component";
import { UsuarioAtletaComponent } from "./components/main/usuario-atleta/usuario-atleta.component";
import { DashboardAtletaComponent } from "./components/main/dashboard-atleta/dashboard-atleta.component";
import { DashboardCoachComponent } from "./components/main/dashboard-coach/dashboard-coach.component";
import { ReportRcComponent } from "./components/main/report-rc/report-rc.component";
import { ReportOsComponent } from "./components/main/report-os/report-os.component";
import { ReportTpComponent } from "./components/main/report-tp/report-tp.component";
import { UsuarioCoachComponent } from './components/main/usuario-coach/usuario-coach.component';
import { SignUpComponent } from "./components/account/sign-up/sign-up.component";
import { ProfileComponent } from "./components/account/profile/profile.component";
import { AtletasComponent } from "./components/main/atletas/atletas.component";
import { SupervisarAtletaComponent } from "./components/main/supervisar-atleta/supervisar-atleta.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'atleta',
    component: UsuarioAtletaComponent,
    children: [
      {
        path: '',
        component: DashboardAtletaComponent,
      },
      {
        path: 'perfil',
        component: ProfileComponent,
      },
      {
        path: 'ritmo-cardiaco',
        component: ReportRcComponent,
      },
      {
        path: 'oxigeno-sangre',
        component: ReportOsComponent,
      },
      {
        path: 'temperatura-corporal',
        component: ReportTpComponent,
      },
    ]
  },
  {
    path: 'coach',
    component: UsuarioCoachComponent,
    children: [
      {
        path: '',
        component: DashboardCoachComponent,
      },
      {
        path: 'perfil',
        component: ProfileComponent,
      },
      {
        path: 'ritmo-cardiaco',
        component: ReportRcComponent,
      },
      {
        path: 'oxigeno-sangre',
        component: ReportOsComponent,
      },
      {
        path: 'temperatura-corporal',
        component: ReportTpComponent,
      },
      {
        path: 'atletas-asignados',
        component: ReportTpComponent,
      },
      {
        path: 'atletas',
        component: AtletasComponent,
      },
      {
        path: 'supervisar-atleta',
        component: SupervisarAtletaComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
