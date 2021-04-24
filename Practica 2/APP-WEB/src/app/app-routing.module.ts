import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//new components
import { LoginComponent } from "./components/account/login/login.component";
import { UsuarioAtletaComponent } from "./components/main/usuario-atleta/usuario-atleta.component";
import { DashboardAtletaComponent } from "./components/main/dashboard-atleta/dashboard-atleta.component";
import { SignUpComponent } from "./components/account/sign-up/sign-up.component";
import { ProfileComponent } from "./components/account/profile/profile.component";

/* Práctica 2 imports*/
import { RealTimeComponent }  from "./components/main/real-time/real-time.component"
import { ReportResultadosComponent }  from "./components/Reports/report-resultados/report-resultados.component"
import { ReportPruebasComponent }  from "./components/Reports/report-pruebas/report-pruebas.component"

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
        path: 'real-time',
        component: RealTimeComponent,
      },
      {
        path: 'perfil',
        component: ProfileComponent,
      },
      {
        path: 'pruebas',
        children: [
          {
            path: '',
            component: ReportPruebasComponent,
          },
          {
            path: 'reportes',
            component: ReportResultadosComponent,
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
