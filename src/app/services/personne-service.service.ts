import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { apiUrlGrails } from 'src/environments/environment';
import { Personne, PersonneToInsert } from '../models/personne';

@Injectable({
  providedIn: 'root',
})
export class PersonneServiceService {
  configUrl = apiUrlGrails;

  constructor(private http: HttpClient) {}

  getPersonnes() {
    return this.http.get<Personne[]>(this.configUrl + 'personne');
  }

  getPersonne(id: String) {
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

// export const FAKE_PERSONNES: Personne[] = [
//   {
//     id_personne: 1,
//     nom: 'Carlynne',
//     prenom: 'Stillmann',
//     mail: 'cstillmann0@aol.com',
//     date_naissance: new Date('1971-08-10'),
//     adresse: '7036 Roxbury Drive',
//     sexe: 2,
//     cin: '477 603 126 816',
//   },
//   {
//     id_personne: 2,
//     nom: 'Marylin',
//     prenom: 'Meugens',
//     mail: 'mmeugens1@pinterest.com',
//     date_naissance: new Date('1992-08-02'),
//     adresse: '389 Algoma Parkway',
//     sexe: 2,
//     cin: '430 146 730 748',
//   },
//   {
//     id_personne: 3,
//     nom: 'Germaine',
//     prenom: 'Conradie',
//     mail: 'gconradie2@mtv.com',
//     date_naissance: new Date('1962-06-16'),
//     adresse: '5 Hazelcrest Center',
//     sexe: 1,
//     cin: '191 822 898 430',
//   },
//   {
//     id_personne: 4,
//     nom: 'Fernando',
//     prenom: 'Caurah',
//     mail: 'fcaurah3@trellian.com',
//     date_naissance: new Date('1976-12-13'),
//     adresse: '56000 Mosinee Avenue',
//     sexe: 2,
//     cin: '210 464 188 913',
//   },
//   {
//     id_personne: 5,
//     nom: 'Pearl',
//     prenom: 'Duckerin',
//     mail: 'pduckerin4@telegraph.co.uk',
//     date_naissance: new Date('1994-10-26'),
//     adresse: '5048 Pleasure Court',
//     sexe: 2,
//     cin: '412 893 279 833',
//   },
//   {
//     id_personne: 6,
//     nom: 'Willow',
//     prenom: 'Steljes',
//     mail: 'wsteljes5@kickstarter.com',
//     date_naissance: new Date('1965-11-14'),
//     adresse: '223 Hagan Pass',
//     sexe: 2,
//     cin: '054 572 770 477',
//   },
//   {
//     id_personne: 7,
//     nom: 'Pru',
//     prenom: 'Pervew',
//     mail: 'ppervew6@cloudflare.com',
//     date_naissance: new Date('2000-10-17'),
//     adresse: '710 Helena Terrace',
//     sexe: 2,
//     cin: '061 917 532 275',
//   },
//   {
//     id_personne: 8,
//     nom: 'Griffin',
//     prenom: 'Shirtcliffe',
//     mail: 'gshirtcliffe7@soup.io',
//     date_naissance: new Date('2001-05-31'),
//     adresse: '93628 Garrison Pass',
//     sexe: 1,
//     cin: '431 132 581 489',
//   },
//   {
//     id_personne: 9,
//     nom: 'Zane',
//     prenom: 'Biasioli',
//     mail: 'zbiasioli8@cam.ac.uk',
//     date_naissance: new Date('1976-03-05'),
//     adresse: '2859 Graedel Place',
//     sexe: 1,
//     cin: '327 542 995 900',
//   },
//   {
//     id_personne: 10,
//     nom: 'Buiron',
//     prenom: 'McEntagart',
//     mail: 'bmcentagart9@google.ca',
//     date_naissance: new Date('1980-07-11'),
//     adresse: '5 2nd Parkway',
//     sexe: 1,
//     cin: '810 371 285 377',
//   },
// ];
