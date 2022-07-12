import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCentreComponent } from './centre/create-centre/create-centre.component';
import { CreateLieuComponent } from './lieu/create-lieu/create-lieu.component';
import { CreateComponent } from './personne/create/create.component';
import { DetailPersonneComponent } from './personne/detail-personne/detail-personne.component';
import { TdbComponent } from './tdb/tdb.component';
import { CreateTestComponent } from './testCovid/create-test/create-test.component';
import { CreateVaccinComponent } from './vaccins/create-vaccin/create-vaccin.component';

const routes: Routes = [
  { path: '', redirectTo: 'tdb', pathMatch: 'full' },
  { path: 'det', component: DetailPersonneComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
