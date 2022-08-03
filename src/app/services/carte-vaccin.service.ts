import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlGrails } from 'src/environments/environment';
import {
  CarteVaccination,
  CarteVaccinationToInsert,
} from '../models/carte-vaccination';

@Injectable({
  providedIn: 'root',
})
export class CarteVaccinService {
  configUrl = apiUrlGrails;

  constructor(private http: HttpClient) {}

  getCartes() {
    return this.http.get<CarteVaccination[]>(this.configUrl + 'cartev');
  }

  getCarte(id: String) {
    return this.http.get<CarteVaccination>(this.configUrl + 'cartev/' + id);
  }

  addCarte(carte: CarteVaccinationToInsert): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(carte);
    console.log(body);
    return this.http.post(this.configUrl + 'cartev', body, {
      headers: headers,
    });
  }
}
// export const FAKE_CARTES: CarteVaccination[] = [
//   {
//     id_carte: 1,
//     personne_id: 5,
//   },
//   {
//     id_carte: 2,
//     personne_id: 10,
//   },
//   {
//     id_carte: 3,
//     personne_id: 7,
//   },
//   {
//     id_carte: 4,
//     personne_id: 1,
//   },
//   {
//     id_carte: 5,
//     personne_id: 3,
//   },
// ];
