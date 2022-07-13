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
    id_personne: -1,
    nom: '',
    prenom: '',
    date_naissance: new Date(),
    adresse: '',
    mail: '',
    cin: '',
    sexe: 0,
  };

  centreSelected: Centre = {
    id_centre: -1,
    nom_centre: '',
    adresse_centre: '',
    coordonnees_centre: '',
  };

  vaccin: Vaccin = {
    id_vaccin: -1,
    nom_vaccin: '',
    date_vaccin: new Date(),
    carte_id: -1,
    centre_id: -1,
  };
  vaccinToInsert: VaccinToInsert | undefined;
  isNewPersonne: boolean = true;
  personneToInsert: PersonneToInsert | undefined;
  carteToInsert: CarteVaccinationToInsert | undefined;

  keyword = 'nom';
  keywordCentre = 'nom_centre';

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
          this.carteToInsert = {
            personne_id: this.personneSelected.id_personne,
          };
          this.carteService.addCarte(this.carteToInsert).subscribe((data) => {
            this.vaccin.carte_id = data.id_carte;
            this.vaccinToInsert = {
              nom_vaccin: this.vaccin.nom_vaccin,
              date_vaccin: this.vaccin.date_vaccin,
              carte_id: this.vaccin.carte_id,
              centre_id: this.centreSelected.id_centre,
            };
            this.vaccinService
              .addVaccin(this.vaccinToInsert)
              .subscribe((data) => {
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

                this.vaccin = {
                  id_vaccin: -1,
                  nom_vaccin: '',
                  date_vaccin: new Date(),
                  carte_id: -1,
                  centre_id: -1,
                };
              });
          });
        });
    } else {
      this.carteService.getCartes().subscribe((data: CarteVaccination[]) => {
        var dataFiltre = data.filter(
          (x) => x.personne_id === this.personneSelected.id_personne
        );
        if (dataFiltre.length > 0) {
          this.vaccinToInsert = {
            nom_vaccin: this.vaccin.nom_vaccin,
            date_vaccin: this.vaccin.date_vaccin,
            carte_id: dataFiltre[0].id_carte,
            centre_id: this.centreSelected.id_centre,
          };
          this.vaccinService
            .addVaccin(this.vaccinToInsert)
            .subscribe((data) => {
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

              this.vaccin = {
                id_vaccin: -1,
                nom_vaccin: '',
                date_vaccin: new Date(),
                carte_id: -1,
                centre_id: -1,
              };
            });
        } else {
          this.carteToInsert = {
            personne_id: this.personneSelected.id_personne,
          };
          this.carteService.addCarte(this.carteToInsert).subscribe((data) => {
            this.vaccin.carte_id = data.id_carte;
            this.vaccinToInsert = {
              nom_vaccin: this.vaccin.nom_vaccin,
              date_vaccin: this.vaccin.date_vaccin,
              carte_id: this.vaccin.carte_id,
              centre_id: this.centreSelected.id_centre,
            };
            this.vaccinService
              .addVaccin(this.vaccinToInsert)
              .subscribe((data) => {
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

                this.vaccin = {
                  id_vaccin: -1,
                  nom_vaccin: '',
                  date_vaccin: new Date(),
                  carte_id: -1,
                  centre_id: -1,
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
