import { Component, OnInit } from '@angular/core';
import { Centre } from '../models/centre';
import { Test } from '../models/test';
import { Vaccin } from '../models/vaccin';
import { CentreService } from '../services/centre.service';
import { TestCovidService } from '../services/test-covid.service';
import { VaccinService } from '../services/vaccin.service';
@Component({
  selector: 'app-tdb',
  templateUrl: './tdb.component.html',
  styleUrls: ['./tdb.component.scss'],
})
export class TdbComponent implements OnInit {
  saleData: any = [];

  tests: Test[] = [];
  testsPositif: Test[] = [];
  vaccins: Vaccin[] = [];
  centres: Centre[] = [];

  constructor(
    private testService: TestCovidService,
    private vaccinService: VaccinService,
    private centreService: CentreService
  ) {}

  ngOnInit(): void {
    this.getAllTests();
    this.getAllVaccins();
    this.getAllCentres();
    console.log(this.saleData);
  }

  getAllTests() {
    this.testService.getTests().subscribe((data: any) => {
      this.tests = data.docs;
      this.testsPositif = data.docs.filter((test:Test) => test.etat_test === 1);
      this.saleData.push({ name: 'Test effectué', value: this.tests.length });
      this.saleData.push({
        name: 'Cas positif',
        value: this.testsPositif.length,
      });
    });
  }

  getAllVaccins() {
    this.vaccinService.getVaccins().subscribe((data: any) => {
      this.vaccins = data.docs;
      this.saleData.push({
        name: 'Doses de vaccin administrées',
        value: this.vaccins.length,
      });
    });
  }

  getAllCentres() {
    this.centreService.getCentres().subscribe((data: any) => {
      this.centres = data.docs;
      this.saleData.push({
        name: 'Nombre de centre',
        value: this.centres.length,
      });
    });
  }
}
