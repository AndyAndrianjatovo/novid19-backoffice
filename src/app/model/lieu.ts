export interface Lieu {
  _id: number;
  nom_lieu: string;
  adresse_lieu: string;
  statut_lieu: number;
  coordonnees_lieu: string;
}
export interface LieuToInsert {
  nom_lieu: string;
  adresse_lieu: string;
  statut_lieu: number;
  coordonnees_lieu: string;
}
