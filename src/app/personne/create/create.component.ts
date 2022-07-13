import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Personne, PersonneToInsert } from 'src/app/model/personne';
import { PersonneServiceService } from 'src/app/service/personne-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnChanges {
  personne!: Personne;

  personneToInsert: PersonneToInsert | undefined;

  @Input() personneSelected!: Personne;

  constructor(private personneService: PersonneServiceService) {}

  ngOnInit(): void {
    this.personne = {
      id_personne: -1,
      nom: '',
      prenom: '',
      date_naissance: new Date(),
      adresse: '',
      mail: '',
      cin: '',
      sexe: 1,
    };
    if (this.personneSelected !== undefined) {
      this.personne = this.personneSelected;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['personneSelected'].currentValue) {
      this.personne = this.personneSelected;
    }
  }
  addPerson() {
    this.personneToInsert = {
      nom: this.personne.nom,
      prenom: this.personne.prenom,
      date_naissance: this.personne.date_naissance,
      adresse: this.personne.adresse,
      mail: this.personne.mail,
      cin: this.personne.cin,
      sexe: this.personne.sexe,
    };
    this.personneService
      .addPersonne(this.personneToInsert)
      .subscribe((data) => {
        console.log(data);
        this.personne = {
          id_personne: -1,
          nom: '',
          prenom: '',
          date_naissance: new Date(),
          adresse: '',
          mail: '',
          cin: '',
          sexe: 1,
        };
      });
  }
}
