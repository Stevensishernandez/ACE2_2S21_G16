import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//material modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';

//firebase modules
import { AngularFirestore} from "@angular/fire/firestore";
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from 'src/environments/environment';

//new libraries
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';


import { XsegundoService } from "./services/ServicioReloj";
import { ClockComponent } from './components/otros/clock/clock.component';

//new components
import { LoginComponent } from './components/account/login/login.component';
import { NavAtletaComponent } from './components/main/nav-atleta/nav-atleta.component';
import { UsuarioAtletaComponent } from './components/main/usuario-atleta/usuario-atleta.component';
import { DashboardAtletaComponent } from './components/main/dashboard-atleta/dashboard-atleta.component';
import { ReportRcComponent } from './components/Reports/report-rc/report-rc.component';
import { ReportTpComponent } from './components/Reports/report-tp/report-tp.component';
import { DashboardCoachComponent } from './components/main/dashboard-coach/dashboard-coach.component';
import { NavCoachComponent } from './components/main/nav-coach/nav-coach.component';
import { UsuarioCoachComponent } from './components/main/usuario-coach/usuario-coach.component';
import { SignUpComponent } from './components/account/sign-up/sign-up.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { AtletasComponent } from './components/main/atletas/atletas.component';
import { SupervisarAtletaComponent } from './components/main/supervisar-atleta/supervisar-atleta.component';
import { DialogRitmoComponent } from './components/dialogs/dialog-ritmo/dialog-ritmo.component';
import { DialogTemperaturaComponent } from './components/dialogs/dialog-temperatura/dialog-temperatura.component';
import { DialogOxigenoComponent } from './components/dialogs/dialog-oxigeno/dialog-oxigeno.component';
import { DialogAtletasComponent } from './components/dialogs/dialog-atletas/dialog-atletas.component';
import { DialogSupervisarComponent } from './components/dialogs/dialog-supervisar/dialog-supervisar.component';
import { DialogCompartirComponent } from './components/dialogs/dialog-compartir/dialog-compartir.component';
import { SupervisarAtletaDataComponent } from './components/main/supervisar-atleta-data/supervisar-atleta-data.component';
import { FooterGeneralComponent } from './components/main/footer-general/footer-general.component';
import { RealTimeComponent } from './components/main/real-time/real-time.component';
import { ReportCvComponent } from './components/Reports/report-cv/report-cv.component';
import { ReportCrComponent } from './components/Reports/report-cr/report-cr.component';
import { ReportCdComponent } from './components/Reports/report-cd/report-cd.component';
import { ReportCvfComponent } from './components/Reports/report-cvf/report-cvf.component';
import { ReportCvrComponent } from './components/Reports/report-cvr/report-cvr.component';
import { ReportCComponent } from './components/Reports/report-c/report-c.component';
import { ReportCCoachComponent } from './components/Reports/report-c-coach/report-c-coach.component';
import { DialogCarreraComponent } from './components/dialogs/dialog-carrera/dialog-carrera.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavAtletaComponent,
    UsuarioAtletaComponent,
    DashboardAtletaComponent,
    ReportRcComponent,
    ReportTpComponent,
    DashboardCoachComponent,
    NavCoachComponent,
    UsuarioCoachComponent,
    SignUpComponent,
    ProfileComponent,
    AtletasComponent,
    SupervisarAtletaComponent,
    DialogRitmoComponent,
    DialogTemperaturaComponent,
    DialogOxigenoComponent,
    DialogAtletasComponent,
    SupervisarAtletaDataComponent,
    DialogSupervisarComponent,
    ClockComponent,
    DialogCompartirComponent,
    FooterGeneralComponent,
    RealTimeComponent,
    ReportCvComponent,
    ReportCrComponent,
    ReportCdComponent,
    ReportCvfComponent,
    ReportCvrComponent,
    ReportCComponent,
    ReportCCoachComponent,
    DialogCarreraComponent,
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSidenavModule,

    ChartsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    
  ],
  providers: [XsegundoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

/**
 *angular-devkit
angular fire
angular cli
JESÚS ALEJANDRO MANSILLA VILLATORO0:10
angular realtime
*/