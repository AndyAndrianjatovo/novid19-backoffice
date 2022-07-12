import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { Centre, CentreToInsert } from '../model/centre';

@Injectable({
  providedIn: 'root',
})
export class CentreService {
  configUrl = apiUrl;

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
