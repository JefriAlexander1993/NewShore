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
  origin = new FormControl('MZL');
  destination = new FormControl('MDE');
  currency = new FormControl(1);
  coins =  [
    {
      'label':'CO','value':'4583',
    },
    {
      'label':'MX','value':'17.60',
    },
    {
      'label':'ES','value':'0.91',
    }
  ];
  constructor(public restApi: RestApiService) { }

  convertUppercaseOrigin() {
    this.origin.setValue(this.origin.value?.toUpperCase() === undefined ? null : this.origin.value?.toUpperCase());
  }

  convertUppercaseDestination() {
    this.destination.setValue(this.destination.value?.toUpperCase() === undefined ? null : this.destination.value?.toUpperCase());
  }

  searchJourneyClear(){
    this.Journey =  [];
    this.origin.setValue('')  
    this.destination.setValue('')  
  }
  searchJourney() {

    if (this.origin.value !== "" || this.destination.value !== "") {

      if ((this.origin.value === this.destination.value)) {
        alert('Source and destination cannot be the same');
        return;
      }
      this.restApi.searchJourney(this.origin.value, this.destination.value,this.currency.value).subscribe((data: any) => {
        this.Journey = data;
        if (this.Journey.length > 0) {
          alert('The search has been successful');
          return
        } else {
          alert('They have not found flights that match the information added');
          return
        }
      });
    } else {
      alert('Both fields are required');
      return
    }
  }
}
