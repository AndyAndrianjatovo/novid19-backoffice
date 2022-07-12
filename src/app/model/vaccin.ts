export interface Vaccin {
  id: number;
  idVaccin: number;
  nomVaccin: string;
  centreId: number;
  dateVaccin: Date;
  carteId: number;
}

export interface VaccinToInsert {
  nomVaccin: string;
  centreId: number;
  dateVaccin: Date;
  carteId: number;
}
