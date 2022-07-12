export interface CarteVaccination {
  id: number;
  idCarte: number;
  personneId: number;
}

export interface CarteVaccinationToInsert {
  personneId: number;
}
