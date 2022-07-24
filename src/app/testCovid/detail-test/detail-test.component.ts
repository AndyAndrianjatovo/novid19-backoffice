import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestToDisplay } from 'src/app/model/test';
import { TestCovidService } from 'src/app/service/test-covid.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detail-test',
  templateUrl: './detail-test.component.html',
  styleUrls: ['./detail-test.component.scss'],
})
export class DetailTestComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private testService: TestCovidService
  ) {}

  ngOnInit(): void {}
  getStatuts(etat: number) {
    return this.testService.getStatutTest(etat);
  }
  public convetToPDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data!).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('new-file.pdf'); // Generated PDF
    });
  }
}
export interface DialogData {
  testToDisplay: TestToDisplay;
}
