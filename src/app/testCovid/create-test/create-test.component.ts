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
    id_personne: -1,
    nom: '',
    prenom: '',
    date_naissance: new Date(),
    adresse: '',
    mail: '',
    cin: '',
    sexe: 0,
  };

  isNewPersonne: boolean = true;

  personneToInsert: PersonneToInsert | undefined;

  centreSelected: Centre = {
    id_centre: -1,
    nom_centre: '',
    adresse_centre: '',
    coordonnees_centre: '',
  };

  tests!: Test;
  testToInsert: TestToInsert | undefined;

  keyword = 'nom';
  keywordCentre = 'nom_centre';

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
      id_personne: -1,
      nom: '',
      prenom: '',
      date_naissance: new Date(),
      adresse: '',
      mail: '',
      cin: '',
      sexe: 0,
    };
    this.isNewPersonne = true;
  }
  onClearCentre(e: any) {
    this.centreSelected = {
      id_centre: -1,
      nom_centre: '',
      adresse_centre: '',
      coordonnees_centre: '',
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
      x.nom_centre.toLowerCase().includes(query.toLowerCase())
    );
  };

  ngOnInit(): void {
    this.tests = {
      id_test: -1,
      date_test: new Date(),
      centre_id: -1,
      personne_id: -1,
      etat_test: -1,
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
        date_naissance: this.personneSelected.date_naissance,
        adresse: this.personneSelected.adresse,
        mail: this.personneSelected.mail,
        cin: this.personneSelected.cin,
        sexe: this.personneSelected.sexe,
      };

      this.personneService
        .addPersonne(this.personneToInsert)
        .subscribe((data) => {
          this.personneSelected = data;
          this.tests.personne_id = data.id_personne;
          this.tests.centre_id = this.centreSelected.id_centre;
          this.testToInsert = {
            centre_id: this.tests.centre_id,
            personne_id: this.tests.personne_id,
            date_test: this.tests.date_test,
            etat_test: this.tests.etat_test,
          };
          this.testService.addTest(this.testToInsert).subscribe((data) => {
            this.tests = {
              id_test: -1,
              date_test: new Date(),
              centre_id: -1,
              personne_id: -1,
              etat_test: -1,
            };
            this.personneSelected = {
              id_personne: -1,
              nom: '',
              prenom: '',
              date_naissance: new Date(),
              adresse: '',
              mail: '',
              cin: '',
              sexe: 0,
            };
            this.centreSelected = {
              id_centre: -1,
              nom_centre: '',
              adresse_centre: '',
              coordonnees_centre: '',
            };
          });
        });
    } else {
      this.tests.centre_id = this.centreSelected.id_centre;
      this.tests.personne_id = this.personneSelected.id_personne;

      this.testToInsert = {
        centre_id: this.tests.centre_id,
        personne_id: this.tests.personne_id,
        date_test: this.tests.date_test,
        etat_test: this.tests.etat_test,
      };

      this.testService.addTest(this.testToInsert).subscribe((data) => {
        this.tests = {
          id_test: -1,
          date_test: new Date(),
          centre_id: -1,
          personne_id: -1,
          etat_test: -1,
        };
        this.personneSelected = {
          id_personne: -1,
          nom: '',
          prenom: '',
          date_naissance: new Date(),
          adresse: '',
          mail: '',
          cin: '',
          sexe: 0,
        };
        this.centreSelected = {
          id_centre: -1,
          nom_centre: '',
          adresse_centre: '',
          coordonnees_centre: '',
        };
      });
    }
  }
}
