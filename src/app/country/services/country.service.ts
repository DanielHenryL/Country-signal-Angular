import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestCountry } from '../interfaces/restcountries.interfaces';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interfaces';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private httpClient = inject( HttpClient )

  searchByCapital(query:string):Observable<Country[]>{
    query = query.toLowerCase();
    return this.httpClient.get<RestCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((countries)=> CountryMapper.mapperRestCountriesToCountries(countries)),
        catchError((err) => {
          return throwError(() => new Error(`No se encuentra ese query: ${query}`) )
        })
      )
  }
}
