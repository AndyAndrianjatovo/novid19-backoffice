import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { Vaccin, VaccinToInsert } from '../model/vaccin';

@Injectable({
  providedIn: 'root',
})
export class VaccinService {
  configUrl = apiUrl;

  constructor(private http: HttpClient) {}

  getVaccins() {
    return this.http.get<Vaccin[]>(this.configUrl + 'vaccin');
  }

  getVaccin(id: number) {
    return this.http.get<Vaccin>(this.configUrl + 'vaccin/' + id);
  }

  addVaccin(personne: VaccinToInsert): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(personne);
    console.log(body);
    return this.http.post(this.configUrl + 'vaccin', body, {
      headers: headers,
    });
  }
}
