import { Personne } from 'src/app/models/personne';
export interface Historique {
  _id: String;
  lieu_id: String;
  personne_id: String;
  date_passage: Date;
}

export interface HistoriqueToDisplay{
  _id: String;
  lieu_id: String;
  personne: Personne;
  date_passage: Date;
}
