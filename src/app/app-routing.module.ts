import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCentreComponent } from './centre/create-centre/create-centre.component';
import { ListeCentreComponent } from './centre/liste-centre/liste-centre.component';
import { CreateLieuComponent } from './lieu/create-lieu/create-lieu.component';
import { DetailLieuComponent } from './lieu/detail-lieu/detail-lieu.component';
import { CreateComponent } from './personne/create/create.component';
import { DetailPersonneComponent } from './personne/detail-personne/detail-personne.component';
import { TdbComponent } from './tdb/tdb.component';
import { CreateTestComponent } from './testCovid/create-test/create-test.component';
import { ListeTestComponent } from './testCovid/liste-test/liste-test.component';
import { CreateVaccinComponent } from './vaccins/create-vaccin/create-vaccin.component';

const routes: Routes = [
  { path: '', redirectTo: 'tdb', pathMatch: 'full' },
  { path: 'det', component: DetailPersonneComponent },
  { path: 'detLieux', component: DetailLieuComponent },
  { path: 'listeTest', component: ListeTestComponent },
  {
    path: 'person',
    component: CreateComponent,
  },
  {
    path: 'test',
    component: CreateTestComponent,
  },
  {
    path: 'vaccine',
    component: CreateVaccinComponent,
  },
  {
    path: 'tdb',
    component: TdbComponent,
  },
  {
    path: 'place',
    component: CreateLieuComponent,
  },
  {
    path: 'doctor',
    component: CreateCentreComponent,
  },
  {
    path: 'centre',
    component: ListeCentreComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
