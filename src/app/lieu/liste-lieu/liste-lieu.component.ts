import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lieu } from 'src/app/models/lieux';
import { LieuxService } from 'src/app/services/lieux.service';

@Component({
  selector: 'app-liste-lieu',
  templateUrl: './liste-lieu.component.html',
  styleUrls: ['./liste-lieu.component.scss']
})
export class ListeLieuComponent implements OnInit {
  lieux: Lieu[] =  [];

  constructor(private lieuService: LieuxService,private route: ActivatedRoute,private router: Router ) { }

  ngOnInit(): void {
    this.getLieux();
  }

  getLieux() {
    this.lieuService.getLieux().subscribe((data: any) => {
      this.lieux = data.docs;
    });
  }

  details(lieu_id: String) {
    this.router.navigate(['/lieux/details', lieu_id]);
  }
}
