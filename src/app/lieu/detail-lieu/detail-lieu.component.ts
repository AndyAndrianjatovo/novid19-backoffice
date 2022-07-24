import { Component, OnInit } from '@angular/core';
import { Lieu } from 'src/app/model/lieu';
import { LieuService } from 'src/app/service/lieu.service';

@Component({
  selector: 'app-detail-lieu',
  templateUrl: './detail-lieu.component.html',
  styleUrls: ['./detail-lieu.component.scss'],
})
export class DetailLieuComponent implements OnInit {
  lieux: Lieu[] | undefined;

  constructor(private lieuService: LieuService) {}

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
