import { Centre } from './centre';
import { Personne } from './personne';

export interface Test {
  id_test: number;
  date_test: Date;
  centre_id: number;
  personne_id: number;
  etat_test: number;
}

export interface TestToInsert {
  date_test: Date;
  centre_id: number;
  personne_id: number;
  etat_test: number;
}

export interface TestToDisplay {
  id_test: number;
  date_test: Date;
  etat_test: number;
  centre: Centre;
  personne: Personne;
}
