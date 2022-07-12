import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Centre } from 'src/app/model/centre';
import { Personne, PersonneToInsert } from 'src/app/model/personne';
import { Test, TestToInsert } from 'src/app/model/test';
import { CentreService } from 'src/app/service/centre.service';
import { PersonneServiceService } from 'src/app/service/personne-service.service';
import { TestCovidService } from 'src/app/service/test-covid.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss'],
})
export class CreateTestComponent implements OnInit {
  personneSelected: Personne = {
    id: -1,
    idPersonne: -1,
    nom: '',
    prenom: '',
    dateNaissance: new Date(),
    adresse: '',
    mail: '',
    cin: '',
    sexe: 0,
  };

  isNewPersonne: boolean = true;

  personneToInsert: PersonneToInsert | undefined;

  centreSelected: Centre = {
    id: -1,
    idCentre: -1,
    nomCentre: '',
    adresseCentre: '',
  };

  tests!: Test;
  testToInsert: TestToInsert | undefined;

  keyword = 'nom';
  keywordCentre = 'nomCentre';

  personnes: Personne[] = [];
  centres: Centre[] = [];

  constructor(
    private personneService: PersonneServiceService,
    private centreService: CentreService,
    private testService: TestCovidService
  ) {}

  selectEvent(item: any) {
    this.personneSelected = item;
    this.isNewPersonne = false;
    // do something with selected item
  }
  selectEventCentre(item: any) {
    this.centreSelected = item;
    // do something with selected item
  }

  onClear(e: any) {
    this.personneSelected = {
      id: -1,
      idPersonne: -1,
      nom: '',
      prenom: '',
      dateNaissance: new Date(),
      adresse: '',
      mail: '',
      cin: '',
      sexe: 0,
    };
    this.isNewPersonne = true;
  }
  onClearCentre(e: any) {
    this.centreSelected = {
      id: -1,
      idCentre: -1,
      nomCentre: '',
      adresseCentre: '',
    };
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }
  customFilter = function (personnes: Personne[], query: string): any[] {
    return personnes.filter(
      (x) =>
        x.nom.toLowerCase().includes(query.toLowerCase()) ||
        x.prenom.toLowerCase().includes(query.toLowerCase())
    );
  };
  customFilterCentre = function (centres: Centre[], query: string): any[] {
    return centres.filter((x) =>
      x.nomCentre.toLowerCase().includes(query.toLowerCase())
    );
  };

  ngOnInit(): void {
    this.tests = {
      id: -1,
      idTest: -1,
      dateTest: new Date(),
      centreId: -1,
      personneId: -1,
      etatTest: -1,
    };

    this.getPersonnes();
    this.getCentres();
  }

  getPersonnes() {
    this.personneService.getPersonnes().subscribe((data) => {
      this.personnes = data;
    });
  }
  getCentres() {
    this.centreService.getCentres().subscribe((data) => {
      this.centres = data;
    });
  }

  addTests() {
    if (this.isNewPersonne) {
      this.personneToInsert = {
        nom: this.personneSelected.nom,
        prenom: this.personneSelected.prenom,
        dateNaissance: this.personneSelected.dateNaissance,
        adresse: this.personneSelected.adresse,
        mail: this.personneSelected.mail,
        cin: this.personneSelected.cin,
        sexe: this.personneSelected.sexe,
      };

      this.personneService
        .addPersonne(this.personneToInsert)
        .subscribe((data) => {
          this.personneSelected = data;
          this.tests.personneId = this.personneSelected.id;
          this.tests.centreId = this.centreSelected.id;
          this.testToInsert = {
            centreId: this.tests.centreId,
            personneId: this.tests.personneId,
            dateTest: this.tests.dateTest,
            etatTest: this.tests.etatTest,
          };
          this.testService.addTest(this.tests).subscribe((data) => {
            this.tests = {
              id: -1,
              idTest: -1,
              dateTest: new Date(),
              centreId: -1,
              personneId: -1,
              etatTest: -1,
            };
            this.personneSelected = {
              id: -1,
              idPersonne: -1,
              nom: '',
              prenom: '',
              dateNaissance: new Date(),
              adresse: '',
              mail: '',
              cin: '',
              sexe: 0,
            };
            this.centreSelected = {
              id: -1,
              idCentre: -1,
              nomCentre: '',
              adresseCentre: '',
            };
          });
        });
    } else {
      this.tests.centreId = this.centreSelected.id;
      this.tests.personneId = this.personneSelected.id;

      this.testToInsert = {
        centreId: this.tests.centreId,
        personneId: this.tests.personneId,
        dateTest: this.tests.dateTest,
        etatTest: this.tests.etatTest,
      };

      this.testService.addTest(this.testToInsert).subscribe((data) => {
        this.tests = {
          id: -1,
          idTest: -1,
          dateTest: new Date(),
          centreId: -1,
          personneId: -1,
          etatTest: -1,
        };
        this.personneSelected = {
          id: -1,
          idPersonne: -1,
          nom: '',
          prenom: '',
          dateNaissance: new Date(),
          adresse: '',
          mail: '',
          cin: '',
          sexe: 0,
        };
        this.centreSelected = {
          id: -1,
          idCentre: -1,
          nomCentre: '',
          adresseCentre: '',
        };
      });
    }
  }
}
