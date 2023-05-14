import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Journey } from '../models/Journey';
import { Flight } from '../models/Flight';
import { Transport } from '../models/Transport';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  // Define API
  apiURL = "https://recruiting-api.newshore.es/api/flights/2";
  constructor(private http: HttpClient) { }

  flights: Flight[] = [];
  journes: any = [];
  journesConsider: any = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  searchJourney(origin: any, destination: any, currency: any): Observable<Journey[]> {
    console.log('currency',currency);
    
    return this.http.get<Journey[]>(this.apiURL).pipe(map((response: any) => {

      this.journes = response.filter((journey: any) => {
        return journey.departureStation === origin && journey.arrivalStation === destination;
      });
      const indexToDelete = response.findIndex((item: any) => item.departureStation === origin && item.arrivalStation === destination);
      if (indexToDelete !== -1) {
        response.splice(indexToDelete, 1);
      }
      this.journesConsider = response.filter((journey: any) => {
        return (journey.departureStation === origin || journey.arrivalStation === destination);
      });

      this.flights = this.journesConsider.map((item: any) => {
        const transport = new Transport(item.flightCarrier, item.flightNumber);
        const flight = new Flight(item.departureStation, item.arrivalStation,Math.round(item.price * currency), transport);
        return flight;
      });

      return this.journes.map((item: any) => {
        const journey = new Journey(item.departureStation, item.arrivalStation, Math.round(item.price * currency), this.flights);
        return journey;
      });
    })
    );
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
