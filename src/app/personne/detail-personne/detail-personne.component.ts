import { Component, OnInit } from '@angular/core';
import { Personne } from 'src/app/model/personne';
import { PersonneServiceService } from 'src/app/service/personne-service.service';

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
    this.personneService.getPersonne(1).subscribe(
      (data: Personne) =>
        (this.personne = {
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
