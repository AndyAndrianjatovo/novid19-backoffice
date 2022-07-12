import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { Test, TestToInsert } from '../model/test';

@Injectable({
  providedIn: 'root',
})
export class TestCovidService {
  configUrl = apiUrl;

  constructor(private http: HttpClient) {}

  getTests() {
    return this.http.get<Test[]>(this.configUrl + 'test');
  }

  getTest(id: number) {
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
}
