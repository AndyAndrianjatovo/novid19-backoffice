import { Component, OnInit } from '@angular/core';
import { Centre } from '../model/centre';
import { Test } from '../model/test';
import { Vaccin } from '../model/vaccin';
import { CentreService } from '../service/centre.service';
import { TestCovidService } from '../service/test-covid.service';
import { VaccinService } from '../service/vaccin.service';

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
    this.testService.getTests().subscribe((data: Test[]) => {
      this.tests = data;
      this.testsPositif = data.filter((test) => test.etatTest === 1);
      this.saleData.push({ name: 'Test effectué', value: this.tests.length });
      this.saleData.push({
        name: 'Cas positif',
        value: this.testsPositif.length,
      });
    });
  }

  getAllVaccins() {
    this.vaccinService.getVaccins().subscribe((data: Vaccin[]) => {
      this.vaccins = data;
      this.saleData.push({
        name: 'Doses de vaccin administrées',
        value: this.vaccins.length,
      });
    });
  }

  getAllCentres() {
    this.centreService.getCentres().subscribe((data: Centre[]) => {
      this.centres = data;
      this.saleData.push({
        name: 'Nombre de centre',
        value: this.centres.length,
      });
    });
  }
}
