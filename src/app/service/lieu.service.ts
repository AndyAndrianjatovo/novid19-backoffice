import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlNode } from 'src/environments/environment';
import { Lieu, LieuToInsert } from '../model/lieu';

@Injectable({
  providedIn: 'root',
})
export class LieuService {
  configUrl = apiUrlNode;

  constructor(private http: HttpClient) {}

  getLieux() {
    return this.http.get<Lieu[]>(this.configUrl + 'lieu');
  }

  getLieu(id: number) {
    return this.http.get<Lieu>(this.configUrl + 'lieu/' + id);
  }

  addLieu(lieu: LieuToInsert): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(lieu);
    console.log(body);
    return this.http.post(this.configUrl + 'lieu', body, {
      headers: headers,
    });
  }
}
