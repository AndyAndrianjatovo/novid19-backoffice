import { Personne } from 'src/app/models/personne';
import { PersonneServiceService } from 'src/app/services/personne-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Historique, HistoriqueToDisplay } from 'src/app/models/historique';
import { Lieu } from 'src/app/models/lieux';
import { HistoriqueService } from 'src/app/services/historique.service';
import { LieuxService } from 'src/app/services/lieux.service';

@Component({
  selector: 'app-detail-lieu',
  templateUrl: './detail-lieu.component.html',
  styleUrls: ['./detail-lieu.component.scss'],
})
export class DetailLieuComponent implements OnInit {
  lieux: Lieu | undefined;
  historiques: Historique[] = [];
  histoToDisp: HistoriqueToDisplay[] = [];

  constructor(private lieuService: LieuxService,private activatedRoute: ActivatedRoute,private router: Router,private historiqueService: HistoriqueService, private personneService: PersonneServiceService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.lieuService.getLieu(id).subscribe((data: any) => {
        this.lieux = data;
        console.log(data);
        this.historiqueService.getHistoriqueByLieux(this.lieux!._id).subscribe((data: any) => {
          this.historiques = data;
          this.historiques.forEach(element => {
            this.personneService.getPersonne(element.personne_id).subscribe((data: Personne) => {
              var histo: HistoriqueToDisplay = {
                personne: data,
                _id: element._id,
                date_passage: element.date_passage,
                lieu_id: element.lieu_id,
              } 
              this.histoToDisp.push(histo);
            });
          });
          console.log(data);
        });
      });
    });
  }
}
