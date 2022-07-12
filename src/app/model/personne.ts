export interface Personne {
  id: number;
  idPersonne: number;
  nom: string;
  prenom: string;
  mail: string;
  dateNaissance: Date;
  adresse: string;
  sexe: number;
  cin: string;
}

export interface PersonneToInsert {
  nom: string;
  prenom: string;
  mail: string;
  dateNaissance: Date;
  adresse: string;
  sexe: number;
  cin: string;
}
