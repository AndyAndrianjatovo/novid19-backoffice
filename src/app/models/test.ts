import { Centre, CentreToInsert } from './centre';
import { Personne, PersonneToInsert } from './personne';

export interface Test {
  _id: String;
  id_test: String;
  date_test: Date;
  centre_id: String;
  personne_id: String;
  etat_test: number;
}

export interface TestToDisplay {
  id_test: String;
  date_test: Date;
  etat_test: number;
  centre: Centre;
  personne: Personne;
}

export interface TestToInsert {
  date_test: Date;
  centre_id: String;
  personne_id: String;
  etat_test: number;
}
