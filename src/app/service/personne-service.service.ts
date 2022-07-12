import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { apiUrl } from 'src/environments/environment';
import { Personne, PersonneToInsert } from '../model/personne';

@Injectable({
  providedIn: 'root',
})
export class PersonneServiceService {
  configUrl = apiUrl;

  constructor(private http: HttpClient) {}

  getPersonnes() {
    return this.http.get<Personne[]>(this.configUrl + 'personne');
  }

  getPersonne(id: number) {
    return this.http.get<Personne>(this.configUrl + 'personne/' + id);
  }

  addPersonne(personne: PersonneToInsert): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(personne);
    console.log(body);
    return this.http.post(this.configUrl + 'personne', body, {
      headers: headers,
    });
  }
}
