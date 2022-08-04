import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Centre } from 'src/app/models/centre';
import { CentreService } from 'src/app/services/centre.service';

@Component({
  selector: 'app-liste-centre',
  templateUrl: './liste-centre.component.html',
  styleUrls: ['./liste-centre.component.scss'],
})
export class ListeCentreComponent implements OnInit {
  centres: Centre[] = [];

  constructor(
    private centreService: CentreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.centreService.getCentres().subscribe((data: any) => {
      this.centres = data.docs;
    });
  }
  update(id: String) {
    this.router.navigate(['/centre/details/update', id]);
  }
}
