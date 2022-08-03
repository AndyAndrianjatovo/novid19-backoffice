import { Component, OnInit } from '@angular/core';
import { Lieu } from 'src/app/models/lieux';
import { LieuxService } from 'src/app/services/lieux.service';

@Component({
  selector: 'app-detail-lieu',
  templateUrl: './detail-lieu.component.html',
  styleUrls: ['./detail-lieu.component.scss'],
})
export class DetailLieuComponent implements OnInit {
  lieux: Lieu[] | undefined;

  constructor(private lieuService: LieuxService) {}

  ngOnInit(): void {
    this.getLieux();
  }

  getLieux() {
    this.lieuService.getLieux().subscribe((data: any) => {
      this.lieux = data.docs;
      console.log(data);
      console.log(this.lieux);
    });
  }
}
