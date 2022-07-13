export interface Personne {
  id_personne: number;
  nom: string;
  prenom: string;
  mail: string;
  date_naissance: Date;
  adresse: string;
  sexe: number;
  cin: string;
}

export interface PersonneToInsert {
  nom: string;
  prenom: string;
  mail: string;
  date_naissance: Date;
  adresse: string;
  sexe: number;
  cin: string;
}
