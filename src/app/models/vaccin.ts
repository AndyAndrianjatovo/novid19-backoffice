import { CarteVaccination } from './carte-vaccination';
import { Centre } from './centre';

export interface Vaccin {
  _id: String;
  id_vaccin: String;
  nom_vaccin: string;
  centre_id: String;
  date_vaccin: Date;
  carte_id: String;
}

export interface VaccinToDisplay {
  id_vaccin: String;
  nom_vaccin: string;
  centre: Centre;
  date_vaccin: Date;
  carte: CarteVaccination;
}

export interface VaccinToInsert {
  nom_vaccin: string;
  centre_id: String;
  date_vaccin: Date;
  carte_id: String;
}