import { Component, OnInit } from '@angular/core';
import { Personne } from 'src/app/models/personne';
import { PersonneServiceService } from 'src/app/services/personne-service.service';

@Component({
  selector: 'app-detail-personne',
  templateUrl: './detail-personne.component.html',
  styleUrls: ['./detail-personne.component.scss'],
})
export class DetailPersonneComponent implements OnInit {
  personne: Personne | undefined;

  constructor(private personneService: PersonneServiceService) {}

  ngOnInit(): void {
    this.showPersonne();
  }

  showPersonne() {
    this.personneService.getPersonne("62e979e5a3d0a94b24cb73d9").subscribe(
      (data: Personne) =>
        (this.personne = {
          _id: data._id,
          id_personne: data.id_personne,
          nom: data.nom,
          prenom: data.prenom,
          date_naissance: data.date_naissance,
          adresse: data.adresse,
          mail: data.mail,
          cin: data.cin,
          sexe: data.sexe,
        })
    );
  }
}
