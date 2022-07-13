export interface Vaccin {
  id_vaccin: number;
  nom_vaccin: string;
  centre_id: number;
  date_vaccin: Date;
  carte_id: number;
}

export interface VaccinToInsert {
  nom_vaccin: string;
  centre_id: number;
  date_vaccin: Date;
  carte_id: number;
}
