import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlGrails } from 'src/environments/environment';
import { Vaccin, VaccinToInsert } from '../models/vaccin';

@Injectable({
  providedIn: 'root',
})
export class VaccinService {
  configUrl = apiUrlGrails;

  constructor(private http: HttpClient) {}

  getVaccins() {
    return this.http.get<Vaccin[]>(this.configUrl + 'vaccin');
  }

  getVaccin(id: String) {
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

// export const FAKE_VACCINS: Vaccin[] = [
//   {
//     id_vaccin: 1,
//     nom_vaccin: 'Nicotine Polacrilex',
//     centre_id: 3,
//     date_vaccin: new Date('2022-05-16'),
//     carte_id: 3,
//   },
//   {
//     id_vaccin: 2,
//     nom_vaccin: 'calcipotriene 0.005% and betamethasone dipropionate 0.064%',
//     centre_id: 2,
//     date_vaccin: new Date('2022-06-16'),
//     carte_id: 3,
//   },
//   {
//     id_vaccin: 3,
//     nom_vaccin: 'Diphenhydramine Hydrochloride',
//     centre_id: 2,
//     date_vaccin: new Date('2022-06-22'),
//     carte_id: 5,
//   },
//   {
//     id_vaccin: 4,
//     nom_vaccin: 'Fosfomycin tromethamine',
//     centre_id: 1,
//     date_vaccin: new Date('2022-06-29'),
//     carte_id: 4,
//   },
//   {
//     id_vaccin: 5,
//     nom_vaccin: 'aspirin',
//     centre_id: 1,
//     date_vaccin: new Date('2022-06-24'),
//     carte_id: 4,
//   },
//   {
//     id_vaccin: 6,
//     nom_vaccin: 'Hydroxyzine Hydrochloride',
//     centre_id: 3,
//     date_vaccin: new Date('2022-04-06'),
//     carte_id: 4,
//   },
//   {
//     id_vaccin: 7,
//     nom_vaccin:
//       'CHOLECALCIFEROL, Pyridoxine Hydrochloride, Folic Acid, Levomefolate Calcium, Cyanocobalamin, Iron, and Iodine',
//     centre_id: 3,
//     date_vaccin: new Date('2022-05-22'),
//     carte_id: 1,
//   },
//   {
//     id_vaccin: 8,
//     nom_vaccin: 'Metronidazole',
//     centre_id: 3,
//     date_vaccin: new Date('2022-04-06'),
//     carte_id: 4,
//   },
//   {
//     id_vaccin: 9,
//     nom_vaccin: 'methimazole',
//     centre_id: 3,
//     date_vaccin: new Date('2022-05-11'),
//     carte_id: 5,
//   },
//   {
//     id_vaccin: 10,
//     nom_vaccin: 'Hand Sanitizer Wipes',
//     centre_id: 1,
//     date_vaccin: new Date('2022-03-18'),
//     carte_id: 3,
//   },
//   {
//     id_vaccin: 11,
//     nom_vaccin: 'Sodium Fluoride',
//     centre_id: 3,
//     date_vaccin: new Date('2022-04-15'),
//     carte_id: 4,
//   },
//   {
//     id_vaccin: 12,
//     nom_vaccin:
//       'Acetaminophen, Dextromethorphan Hydrobromide, Doxylamine Succinate',
//     centre_id: 2,
//     date_vaccin: new Date('2022-02-19'),
//     carte_id: 2,
//   },
//   {
//     id_vaccin: 13,
//     nom_vaccin: 'Viscum 1',
//     centre_id: 1,
//     date_vaccin: new Date('2022-04-13'),
//     carte_id: 3,
//   },
//   {
//     id_vaccin: 14,
//     nom_vaccin: 'Glycerin Suppository',
//     centre_id: 3,
//     date_vaccin: new Date('2022-04-21'),
//     carte_id: 5,
//   },
//   {
//     id_vaccin: 15,
//     nom_vaccin: 'PLUMBUM METALLICUM',
//     centre_id: 3,
//     date_vaccin: new Date('2022-02-24'),
//     carte_id: 2,
//   },
//   {
//     id_vaccin: 16,
//     nom_vaccin: 'Natures Tears',
//     centre_id: 1,
//     date_vaccin: new Date('2022-04-01'),
//     carte_id: 2,
//   },
//   {
//     id_vaccin: 17,
//     nom_vaccin: 'Chrysosplenium Chamomilla',
//     centre_id: 2,
//     date_vaccin: new Date('2022-07-05'),
//     carte_id: 2,
//   },
//   {
//     id_vaccin: 18,
//     nom_vaccin: 'ALPRAZOLAM, CHOLINE',
//     centre_id: 2,
//     date_vaccin: new Date('2022-06-21'),
//     carte_id: 4,
//   },
//   {
//     id_vaccin: 19,
//     nom_vaccin: 'Oak, Red Quercus rubra',
//     centre_id: 1,
//     date_vaccin: new Date('2022-04-05'),
//     carte_id: 1,
//   },
//   {
//     id_vaccin: 20,
//     nom_vaccin: 'Acetaminophen, Phenylephrine Hydrochloride',
//     centre_id: 1,
//     date_vaccin: new Date('2022-02-20'),
//     carte_id: 3,
//   },
// ];
