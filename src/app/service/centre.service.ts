import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlGrails } from 'src/environments/environment';
import { Centre, CentreToInsert } from '../model/centre';

@Injectable({
  providedIn: 'root',
})
export class CentreService {
  configUrl = apiUrlGrails;

  constructor(private http: HttpClient) {}

  getCentres() {
    return this.http.get<Centre[]>(this.configUrl + 'centre');
  }

  getCentre(id: number) {
    return this.http.get<Centre>(this.configUrl + 'centre/' + id);
  }

  addCentre(personne: CentreToInsert): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(personne);
    console.log(body);
    return this.http.post(this.configUrl + 'centre', body, {
      headers: headers,
    });
  }
}

export const FAKE_CENTRE: Centre[] = [
  {
    id_centre: 1,
    nom_centre: 'CSB II Antanimena',
    adresse_centre: 'Lot I V G 203, Antananarivo',
    coordonnees_centre: '47.5207772,-18.8991892',
  },
  {
    id_centre: 2,
    nom_centre: 'Centre De Santé De Base CSB II',
    adresse_centre: '2HV9+Q4J, Antananarivo',
    coordonnees_centre: '47.5655623,-18.955541',
  },
  {
    id_centre: 3,
    nom_centre: 'Village VOARA',
    adresse_centre: '4F6R+P34, Antananarivo',
    coordonnees_centre: '47.4880139,-18.8882477',
  },
];
