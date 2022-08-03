import { Personne } from './personne';

export interface CarteVaccination {
  _id:String;
  id_carte: String;
  personne_id: String;
}

export interface CarteVaccinationToInsert {
  personne_id: String;
}

export interface CarteVaccinationToDisplay {
  id_carte: String;
  personne: Personne;
}
