import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlGrails } from 'src/environments/environment';
import { Test, TestToInsert } from '../models/test';

@Injectable({
  providedIn: 'root',
})
export class TestCovidService {
  configUrl = apiUrlGrails;

  constructor(private http: HttpClient) {}

  getTests() {
    return this.http.get<Test[]>(this.configUrl + 'test');
  }

  getTest(id: String) {
    return this.http.get<Test>(this.configUrl + 'test/' + id);
  }

  addTest(test: TestToInsert): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(test);
    console.log(body);
    return this.http.post(this.configUrl + 'test', body, {
      headers: headers,
    });
  }

  getStatutTest(etat_test: number) {
    switch (etat_test) {
      case 1:
        return 'Positif';
      case 2:
        return 'Negatif';
      default:
        return 'Indéterminé';
    }
  }
}

