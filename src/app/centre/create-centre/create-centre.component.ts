import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  SimpleChanges,
  OnChanges,
  Input,
} from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { Map, NavigationControl } from 'maplibre-gl';
import { Centre, CentreToInsert } from 'src/app/model/centre';
import { CentreService } from 'src/app/service/centre.service';

@Component({
  selector: 'app-create-centre',
  templateUrl: './create-centre.component.html',
  styleUrls: ['./create-centre.component.scss'],
})
export class CreateCentreComponent implements OnInit, OnChanges {
  centre: Centre = {
    id: -1,
    nomCentre: '',
    idCentre: -1,
    adresseCentre: '',
  };

  centreToInsert: CentreToInsert | undefined;

  @Input() centreSelected!: Centre;
  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private centreService: CentreService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['centreSelected'].currentValue) {
      this.centre = this.centreSelected;
    }
  }
  ngAfterViewInit() {
    const myAPIKey = 'f4040400dcfc4a43808745beaec78557';
    const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';

    const initialState = { lng: 47.516667, lat: -18.933333, zoom: 12 };

    const map = new Map({
      container: this.mapContainer.nativeElement,
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    this.map = map;
    this.map.addControl(new NavigationControl());

    this.map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      this.centre.adresseCentre = `${lng}, ${lat}`;
      var monument: [number, number] = [lng, lat];

      // create DOM element for the marker
      var markers = document.getElementsByClassName('markerIcon');
      for (var i = 0; i < markers.length; i++) {
        markers[i].remove();
      }

      var el = document.createElement('div');
      el.id = 'marker';
      el.style.backgroundImage = 'url(../../../assets/img/icon/marker.png)';
      el.style.backgroundSize = 'cover';
      el.style.width = '25px';
      el.style.height = '25px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.classList.add('markerIcon');

      // create the marker
      new maplibregl.Marker(el).setLngLat(monument).addTo(map);
      this.map = map;
    });
  }
  ngOnDestroy() {
    this.map?.remove();
  }

  addCentre() {
    this.centreToInsert = {
      nomCentre: this.centre.nomCentre,
      adresseCentre: this.centre.adresseCentre,
    };
    this.centreService.addCentre(this.centreToInsert).subscribe((data) => {
      console.log(data);
      this.centre = {
        id: -1,
        nomCentre: '',
        idCentre: -1,
        adresseCentre: '',
      };
    });
  }
}
