import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlNode } from 'src/environments/environment';
import { Lieu, LieuToInsert } from '../models/lieux';

@Injectable({
  providedIn: 'root',
})
export class LieuxService {
  configUrl = apiUrlNode;

  constructor(private http: HttpClient) {}

  getLieux() {
    return this.http.get<Lieu[]>(this.configUrl + 'lieu');
  }

  getLieu(id: String) {
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

// export const ELEMENT_DATA: Lieu[] = [
//   {
//     _id: 1,
//     nom_lieu: 'Dité',
//     adresse_lieu: 'La City Ankorondrano, Antananarivo 101 Madagascar',
//     coordonnees_lieu: '47.5190399, -18.8751833',
//     statut_lieu: 0,
//   },
//   {
//     _id: 2,
//     nom_lieu: 'Bogota Fast Casual',
//     adresse_lieu:
//       'Gastro Pizza, 1 Quartier Géneral Mathew Lawfield Antananarivo By-Pass près, Antananarivo',
//     statut_lieu: 0,
//     coordonnees_lieu: '47.540854,-18.9849491',
//   },
//   {
//     _id: 3,
//     nom_lieu: 'Le Louvre Hôtel & Spa',
//     adresse_lieu: 'Jardin Antaninarenina, Antananarivo',
//     statut_lieu: 0,
//     coordonnees_lieu: '47.5226527,-18.9102878',
//   },
//   {
//     _id: 4,
//     nom_lieu: 'O2 Resto lounge Bar',
//     adresse_lieu: 'Lot I V G 203',
//     statut_lieu: 0,
//     coordonnees_lieu: '47.5163863,-18.8992409',
//   },
//   {
//     _id: 5,
//     nom_lieu: 'Chez Dani',
//     adresse_lieu: '4GHX+P38, Antananarivo',
//     statut_lieu: 0,
//     coordonnees_lieu: '47.5467471,-18.8712697',
//   },
//   {
//     _id: 6,
//     nom_lieu: 'Tartines Et Chocolats',
//     adresse_lieu: '4HC6+2PR, Antananarivo',
//     statut_lieu: 0,
//     coordonnees_lieu: '47.5595682,-18.8798924',
//   },
// ];
