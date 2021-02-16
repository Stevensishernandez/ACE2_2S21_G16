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


//firebase modules
import { AngularFirestore} from "@angular/fire/firestore";
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';

//new libraries
import { ChartsModule } from 'ng2-charts';

//new components
import { LoginComponent } from './components/account/login/login.component';
import { NavAtletaComponent } from './components/main/nav-atleta/nav-atleta.component';
import { UsuarioAtletaComponent } from './components/main/usuario-atleta/usuario-atleta.component';
import { DashboardAtletaComponent } from './components/main/dashboard-atleta/dashboard-atleta.component';
import { ReportRcComponent } from './components/main/report-rc/report-rc.component';
import { ReportTpComponent } from './components/main/report-tp/report-tp.component';
import { ReportOsComponent } from './components/main/report-os/report-os.component';
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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavAtletaComponent,
    UsuarioAtletaComponent,
    DashboardAtletaComponent,
    ReportRcComponent,
    ReportTpComponent,
    ReportOsComponent,
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

    ChartsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
