import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  Journey: any = [];
  origin = new FormControl('BOG');
  destination = new FormControl('MEX');
  constructor(public restApi: RestApiService) { }

  convertUppercaseOrigin() {
    this.origin.setValue(this.origin.value?.toUpperCase() === undefined ? null : this.origin.value?.toUpperCase());
  }

  convertUppercaseDestination() {
    this.destination.setValue(this.destination.value?.toUpperCase() === undefined ? null : this.destination.value?.toUpperCase());
  }


  searchJourney() {

    if (this.origin.value !== "" || this.destination.value !== "") {

      if ((this.origin.value === this.destination.value)) {
        alert('El origin y el distino no pueden ser iguales');
        return;
      }
      this.restApi.searchJourney(this.origin.value, this.destination.value).subscribe((data: any) => {
   
        console.log('Journey',data);
        
        this.Journey = data;
        if (this.Journey.length > 0) {
          alert('La busqueda ha traido resultado');
          return
        } else {
          alert('No han entrado vuelos que concidan con la información agregada');
          return
        }
      });
    } else {
      alert('Se require que se dirigencie al menos el campo de origin');
      return
    }
  }
}
