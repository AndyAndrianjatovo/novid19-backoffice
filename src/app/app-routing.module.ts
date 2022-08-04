import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCentreComponent } from './centre/create-centre/create-centre.component';
import { ListeCentreComponent } from './centre/liste-centre/liste-centre.component';
import { UpdateCentreComponent } from './centre/update-centre/update-centre.component';
import { CreateLieuComponent } from './lieu/create-lieu/create-lieu.component';
import { DetailLieuComponent } from './lieu/detail-lieu/detail-lieu.component';
import { ListeLieuComponent } from './lieu/liste-lieu/liste-lieu.component';
import { UpdateLieuComponent } from './lieu/update-lieu/update-lieu.component';
import { CreateComponent } from './personne/create/create.component';
import { DetailPersonneComponent } from './personne/detail-personne/detail-personne.component';
import { TdbComponent } from './tdb/tdb.component';
import { CreateTestComponent } from './testCovid/create-test/create-test.component';
import { ListeTestComponent } from './testCovid/liste-test/liste-test.component';
import { CreateVaccinComponent } from './vaccins/create-vaccin/create-vaccin.component';

const routes: Routes = [
  { path: '', redirectTo: 'tdb', pathMatch: 'full' },
  { path: 'det', component: DetailPersonneComponent },
  { path: 'lieux/details/:id', component: DetailLieuComponent },
  { path: 'lieux/details/update/:id', component: UpdateLieuComponent },
  { path: 'centre/details/update/:id', component: UpdateCentreComponent },
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
  },
  {
    path: 'places',
    component: ListeLieuComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
