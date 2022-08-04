import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreateComponent } from './personne/create/create.component';
import { MatCardModule } from '@angular/material/card';
import { TdbComponent } from './tdb/tdb.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CreateCentreComponent } from './centre/create-centre/create-centre.component';
import { CreateLieuComponent } from './lieu/create-lieu/create-lieu.component';
import { DetailLieuComponent } from './lieu/detail-lieu/detail-lieu.component';
import { DetailCentreComponent } from './centre/detail-centre/detail-centre.component';
import { DetailPersonneComponent } from './personne/detail-personne/detail-personne.component';
import { DetailVaccinComponent } from './vaccins/detail-vaccin/detail-vaccin.component';
import { CreateVaccinComponent } from './vaccins/create-vaccin/create-vaccin.component';
import { CreateTestComponent } from './testCovid/create-test/create-test.component';
import { DetailTestComponent } from './testCovid/detail-test/detail-test.component';
import { HttpClientModule } from '@angular/common/http';
import { ListeTestComponent } from './testCovid/liste-test/liste-test.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListeCentreComponent } from './centre/liste-centre/liste-centre.component';
import { ListeLieuComponent } from './lieu/liste-lieu/liste-lieu.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    TdbComponent,
    CreateCentreComponent,
    CreateLieuComponent,
    DetailLieuComponent,
    DetailCentreComponent,
    DetailPersonneComponent,
    DetailVaccinComponent,
    CreateVaccinComponent,
    CreateTestComponent,
    DetailTestComponent,
    ListeTestComponent,
    ListeCentreComponent,
    ListeLieuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NgxChartsModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    AutocompleteLibModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    NgxQRCodeModule,
    MatInputModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
