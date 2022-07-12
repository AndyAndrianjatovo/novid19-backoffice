import { Component, OnInit } from '@angular/core';
import {
  CarteVaccination,
  CarteVaccinationToInsert,
} from 'src/app/model/carte-vaccination';
import { Centre } from 'src/app/model/centre';
import { Personne, PersonneToInsert } from 'src/app/model/personne';
import { Vaccin, VaccinToInsert } from 'src/app/model/vaccin';
import { CarteVaccinService } from 'src/app/service/carte-vaccin.service';
import { CentreService } from 'src/app/service/centre.service';
import { PersonneServiceService } from 'src/app/service/personne-service.service';
import { VaccinService } from 'src/app/service/vaccin.service';

@Component({
  selector: 'app-create-vaccin',
  templateUrl: './create-vaccin.component.html',
  styleUrls: ['./create-vaccin.component.scss'],
})
export class CreateVaccinComponent implements OnInit {
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

  centreSelected: Centre = {
    id: -1,
    idCentre: -1,
    nomCentre: '',
    adresseCentre: '',
  };

  vaccin: Vaccin = {
    id: -1,
    idVaccin: -1,
    nomVaccin: '',
    dateVaccin: new Date(),
    carteId: -1,
    centreId: -1,
  };
  vaccinToInsert: VaccinToInsert | undefined;
  isNewPersonne: boolean = true;
  personneToInsert: PersonneToInsert | undefined;
  carteToInsert: CarteVaccinationToInsert | undefined;

  keyword = 'nom';
  keywordCentre = 'nomCentre';

  public personnes: Personne[] = [];
  public centres: Centre[] = [];

  selectEvent(item: any) {
    this.personneSelected = item;
    this.isNewPersonne = false;
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

  constructor(
    private personneService: PersonneServiceService,
    private carteService: CarteVaccinService,
    private vaccinService: VaccinService,
    private centreService: CentreService
  ) {}

  ngOnInit(): void {
    this.getPersonnes();
    this.getCentres();
  }

  addVaccination() {
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
          this.carteToInsert = {
            personneId: this.personneSelected.id,
          };
          this.carteService.addCarte(this.carteToInsert).subscribe((data) => {
            this.vaccin.carteId = data.id;
            this.vaccinToInsert = {
              nomVaccin: this.vaccin.nomVaccin,
              dateVaccin: this.vaccin.dateVaccin,
              carteId: this.vaccin.carteId,
              centreId: this.centreSelected.id,
            };
            this.vaccinService
              .addVaccin(this.vaccinToInsert)
              .subscribe((data) => {
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

                this.vaccin = {
                  id: -1,
                  idVaccin: -1,
                  nomVaccin: '',
                  dateVaccin: new Date(),
                  carteId: -1,
                  centreId: -1,
                };
              });
          });
        });
    } else {
      this.carteService.getCartes().subscribe((data: CarteVaccination[]) => {
        var dataFiltre = data.filter(
          (x) => x.personneId === this.personneSelected.id
        );
        if (dataFiltre.length > 0) {
          this.vaccinToInsert = {
            nomVaccin: this.vaccin.nomVaccin,
            dateVaccin: this.vaccin.dateVaccin,
            carteId: dataFiltre[0].id,
            centreId: this.centreSelected.id,
          };
          this.vaccinService
            .addVaccin(this.vaccinToInsert)
            .subscribe((data) => {
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

              this.vaccin = {
                id: -1,
                idVaccin: -1,
                nomVaccin: '',
                dateVaccin: new Date(),
                carteId: -1,
                centreId: -1,
              };
            });
        } else {
          this.carteToInsert = {
            personneId: this.personneSelected.id,
          };
          this.carteService.addCarte(this.carteToInsert).subscribe((data) => {
            this.vaccin.carteId = data.id;
            this.vaccinToInsert = {
              nomVaccin: this.vaccin.nomVaccin,
              dateVaccin: this.vaccin.dateVaccin,
              carteId: this.vaccin.carteId,
              centreId: this.centreSelected.id,
            };
            this.vaccinService
              .addVaccin(this.vaccinToInsert)
              .subscribe((data) => {
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

                this.vaccin = {
                  id: -1,
                  idVaccin: -1,
                  nomVaccin: '',
                  dateVaccin: new Date(),
                  carteId: -1,
                  centreId: -1,
                };
              });
          });
        }
      });
    }
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
}
