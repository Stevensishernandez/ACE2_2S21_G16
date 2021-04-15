import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//new components
import { LoginComponent } from "./components/account/login/login.component";
import { UsuarioAtletaComponent } from "./components/main/usuario-atleta/usuario-atleta.component";
import { DashboardAtletaComponent } from "./components/main/dashboard-atleta/dashboard-atleta.component";
import { DashboardCoachComponent } from "./components/main/dashboard-coach/dashboard-coach.component";
import { ReportRcComponent } from "./components/Reports/report-rc/report-rc.component";
import { ReportTpComponent } from "./components/Reports/report-tp/report-tp.component";
import { UsuarioCoachComponent } from './components/main/usuario-coach/usuario-coach.component';
import { SignUpComponent } from "./components/account/sign-up/sign-up.component";
import { ProfileComponent } from "./components/account/profile/profile.component";
import { AtletasComponent } from "./components/main/atletas/atletas.component";
import { SupervisarAtletaComponent } from "./components/main/supervisar-atleta/supervisar-atleta.component";

/* Proyecto 1 imports*/
import { RealTimeComponent }  from "./components/main/real-time/real-time.component"
import { ReportCvComponent } from './components/Reports/report-cv/report-cv.component';
import { ReportCrComponent } from './components/Reports/report-cr/report-cr.component';
import { ReportCdComponent } from './components/Reports/report-cd/report-cd.component';
import { ReportCvfComponent } from './components/Reports/report-cvf/report-cvf.component';
import { ReportCvrComponent } from './components/Reports/report-cvr/report-cvr.component';
import { ReportCComponent } from './components/Reports/report-c/report-c.component';
import { ReportCCoachComponent } from './components/Reports/report-c-coach/report-c-coach.component';

const routes: Routes = [
  {
    path: '',
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
        path: 'real-time',
        component: RealTimeComponent,
      },
      {
        path: 'ritmo-cardiaco',
        component: ReportRcComponent,
      },
      {
        path: 'temperatura-corporal',
        component: ReportTpComponent,
      },
      {
        path: 'carrera',
        children: [
          {
            path: '',
            component: ReportCComponent,
          },
          {
            path: 'conteo-repeticiones',
            component: ReportCrComponent,
          },
          {
            path: 'velocidad-alcanzada',
            component: ReportCvComponent,
          },
          {
            path: 'distancia-repeticion',
            component: ReportCdComponent,
          },
          {
            path: 'conteo-fallos',
            component: ReportCvfComponent,
          },
          {
            path: 'conteo-rendicion',
            component: ReportCvrComponent,
          },
        ]
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
        path: 'real-time',
        component: RealTimeComponent,
      },
      {
        path: 'ritmo-cardiaco',
        component: ReportRcComponent,
      },
      {
        path: 'temperatura-corporal',
        component: ReportTpComponent,
      },
      {
        path: 'carrera',
        children: [
          {
            path: '',
            component: ReportCCoachComponent,
          },
          {
            path: 'conteo-repeticiones',
            component: ReportCrComponent,
          },
          {
            path: 'velocidad-alcanzada',
            component: ReportCvComponent,
          },
          {
            path: 'distancia-repeticion',
            component: ReportCdComponent,
          },
          {
            path: 'conteo-fallos',
            component: ReportCvfComponent,
          },
          {
            path: 'conteo-rendicion',
            component: ReportCvrComponent,
          },
        ]
      },
      {
        path: 'atletas-asignados',
        component: ReportTpComponent,
      },
      {
        path: 'atletas',
        component: AtletasComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
