import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { Map, NavigationControl } from 'maplibre-gl';
import { Lieu, LieuToInsert } from 'src/app/model/lieu';
import { LieuService } from 'src/app/service/lieu.service';

@Component({
  selector: 'app-create-lieu',
  templateUrl: './create-lieu.component.html',
  styleUrls: ['./create-lieu.component.scss'],
})
export class CreateLieuComponent implements OnInit {
  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  lieu: Lieu = {
    _id: -1,
    nom_lieu: '',
    adresse_lieu: '',
    statut_lieu: -1,
    coordonnees_lieu: '',
  };

  lieuToInsert: LieuToInsert | undefined;

  constructor(private lieuService: LieuService) {}

  ngOnInit(): void {}

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
      this.lieu.coordonnees_lieu = `${lng}, ${lat}`;
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

  addLieu() {
    this.lieuToInsert = {
      nom_lieu: this.lieu.nom_lieu,
      adresse_lieu: this.lieu.adresse_lieu,
      statut_lieu: 1,
      coordonnees_lieu: this.lieu.coordonnees_lieu,
    };
    this.lieuService.addLieu(this.lieuToInsert).subscribe((data) => {
      this.lieu = {
        _id: -1,
        nom_lieu: '',
        adresse_lieu: '',
        statut_lieu: -1,
        coordonnees_lieu: '',
      };
      var markers = document.getElementsByClassName('markerIcon');
      for (var i = 0; i < markers.length; i++) {
        markers[i].remove();
      }
    });
  }
}
