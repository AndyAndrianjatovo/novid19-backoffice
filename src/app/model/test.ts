export interface Test {
  id: number;
  idTest: number;
  dateTest: Date;
  centreId: number;
  personneId: number;
  etatTest: number;
}

export interface TestToInsert {
  dateTest: Date;
  centreId: number;
  personneId: number;
  etatTest: number;
}
