export interface Centre {
  id_centre: number;
  nom_centre: string;
  adresse_centre: string;
  coordonnees_centre: string;
}

export interface CentreToInsert {
  nom_centre: string;
  adresse_centre: string;
  coordonnees_centre: string;
}
