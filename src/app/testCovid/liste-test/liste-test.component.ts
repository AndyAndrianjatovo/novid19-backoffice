import { Component, OnInit, ViewChild } from '@angular/core';
import { Centre } from 'src/app/models/centre';
import { Personne } from 'src/app/models/personne';
import { Test, TestToDisplay } from 'src/app/models/test';
import { CentreService } from 'src/app/services/centre.service';
import { PersonneServiceService } from 'src/app/services/personne-service.service';
import { TestCovidService } from 'src/app/services/test-covid.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DetailTestComponent } from '../detail-test/detail-test.component';

@Component({
  selector: 'app-liste-test',
  templateUrl: './liste-test.component.html',
  styleUrls: ['./liste-test.component.scss'],
})
export class ListeTestComponent implements OnInit {
  test: Test[] = [];
  personnes: Personne[] = [];
  centres: Centre[] = [];
  testToDisplay: TestToDisplay[] = [];
  displayedColumns: string[] = [
    'personne',
    'date_test',
    'etat_test',
    'centre',
    'mail',
    'adresse',
    'sexe',
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  constructor(
    private testService: TestCovidService,
    private personneService: PersonneServiceService,
    private centreService: CentreService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTestToDisplay();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTestToDisplay() {
    this.testService.getTests().subscribe((data: any) => {
      console.log(data.docs);
      this.test = data.docs;
      this.centreService.getCentres().subscribe((data: any) => {
        this.centres = data.docs;
        this.personneService.getPersonnes().subscribe((data: any) => {
          this.personnes = data.docs;
          this.test.forEach((test) => {
            var personneTemp = this.personnes.find(
              (pers) => pers._id === test.personne_id
            );
            var centreTemp = this.centres.find(
              (centre) => centre._id === test.centre_id
            );
            this.testToDisplay.push({
              id_test: test._id,
              date_test: test.date_test,
              etat_test: test.etat_test,
              personne: personneTemp!,
              centre: centreTemp!,
              _id: test._id,
            });
            this.dataSource = new MatTableDataSource<TestToDisplay>(
              this.testToDisplay
            );
          });
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
    });
  }

  getStatuts(etat: number) {
    return this.testService.getStatutTest(etat);
  }

  getSexe(sexe: number) {
    switch (sexe) {
      case 1:
        return 'Homme';
      case 2:
        return 'Femme';
      default:
        return 'Inconnu';
    }
  }

  checkTest(element: TestToDisplay) {
    console.log(element);
    this.dialog.open(DetailTestComponent, {
      width: '1000px',
      data: { testToDisplay: element },
    });
  }
}
