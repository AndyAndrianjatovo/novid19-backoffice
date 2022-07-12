import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import {
  CarteVaccination,
  CarteVaccinationToInsert,
} from '../model/carte-vaccination';

@Injectable({
  providedIn: 'root',
})
export class CarteVaccinService {
  configUrl = apiUrl;

  constructor(private http: HttpClient) {}

  getCartes() {
    return this.http.get<CarteVaccination[]>(this.configUrl + 'cartev');
  }

  getCarte(id: number) {
    return this.http.get<CarteVaccination>(this.configUrl + 'cartev/' + id);
  }

  addCarte(personne: CarteVaccinationToInsert): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(personne);
    console.log(body);
    return this.http.post(this.configUrl + 'cartev', body, {
      headers: headers,
    });
  }
}
