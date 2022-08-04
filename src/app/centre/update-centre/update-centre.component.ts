import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Centre, CentreToInsert } from 'src/app/models/centre';
import { CentreService } from 'src/app/services/centre.service';
import * as maplibregl from 'maplibre-gl';
import { Map, NavigationControl } from 'maplibre-gl';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-centre',
  templateUrl: './update-centre.component.html',
  styleUrls: ['./update-centre.component.scss'],
})
export class UpdateCentreComponent implements OnInit {
  centre: Centre = {
    _id: '',
    nom_centre: '',
    id_centre: '',
    adresse_centre: '',
    coordonnees_centre: '',
  };
  centreToInsert: CentreToInsert | undefined;

  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(
    private centreService: CentreService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const myAPIKey = 'f4040400dcfc4a43808745beaec78557';
    const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.centreService.getCentre(id).subscribe((data: any) => {
        this.centre = data;
        console.log(data);
        var lng = +this.centre.coordonnees_centre.split(',')[0];
        var lat = +this.centre.coordonnees_centre.split(',')[1];

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
          this.centre.coordonnees_centre = `${lng}, ${lat}`;
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

  updateCentre() {
    this.centreService.updateCentre(this.centre).subscribe((data) => {
      this.router.navigate(['/centre']);
    });
  }
}
