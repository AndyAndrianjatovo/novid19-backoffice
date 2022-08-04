import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as maplibregl from 'maplibre-gl';
import { Map, NavigationControl } from 'maplibre-gl';
import { Lieu, LieuToInsert } from 'src/app/models/lieux';
import { LieuxService } from 'src/app/services/lieux.service';

@Component({
  selector: 'app-update-lieu',
  templateUrl: './update-lieu.component.html',
  styleUrls: ['./update-lieu.component.scss'],
})
export class UpdateLieuComponent implements OnInit {
  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  lieu: Lieu = {
    _id: '',
    nom_lieu: '',
    adresse_lieu: '',
    statut_lieu: -1,
    coordonnees_lieu: '',
  };

  lieuToInsert: LieuToInsert | undefined;

  constructor(
    private lieuService: LieuxService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const myAPIKey = 'f4040400dcfc4a43808745beaec78557';
    const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.lieuService.getLieu(id).subscribe((data: any) => {
        this.lieu = data;
        console.log(data);
        var lng = +this.lieu.coordonnees_lieu.split(',')[0];
        var lat = +this.lieu.coordonnees_lieu.split(',')[1];

        const initialState = { lng: lng, lat: lat, zoom: 15 };

        const map = new Map({
          container: this.mapContainer.nativeElement,
          style: `${mapStyle}?apiKey=${myAPIKey}`,
          center: [initialState.lng, initialState.lat],
          zoom: initialState.zoom,
        });

        this.map = map;

        var monument: [number, number] = [lng, lat];
        var el = document.createElement('div');
        el.id = 'marker';
        el.style.backgroundImage = 'url(../../../assets/img/icon/marker.png)';
        el.style.backgroundSize = 'cover';
        el.style.width = '25px';
        el.style.height = '25px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        el.classList.add('markerIcon');
        new maplibregl.Marker(el).setLngLat(monument).addTo(this.map!);

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
      });
    });
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

  updateLieu() {
    this.lieuService.updateLieu(this.lieu).subscribe((data) => {
      this.router.navigate(['/places']);
    });
  }
}
