import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { TableListComponent } from "../../components/table-list/table-list.component";
import {rxResource} from '@angular/core/rxjs-interop'
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, TableListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  private countryService = inject( CountryService );

  query = signal('');

  countryResource = rxResource({
    request: () => ({query:this.query()}),
    loader: ({request}) => {
      if( !request.query ) return of([]);

      return this.countryService.searchByCapital(request.query)
    }
  })

  // countryResource = resource({
  //   request: () => ({query:this.query()}),
  //   loader: async({request}) => {
  //     if( !request.query ) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(request.query)
  //     )
  //   }
  // })

  // public isLoading = signal<boolean>(false);
  // public hasError = signal<string|null>(null);
  // public countries = signal<Country[]>([]);

  // onSearch( query:string ){
  //   this.isLoading.set(true);
  //   this.hasError.set(null);
  //   this.countryService.searchByCapital(query)
  //     .subscribe({
  //       next: (countries) => {
  //         this.isLoading.set(false);
  //         this.countries.set(countries);
  //         this.hasError.set(null);
  //       },
  //       error:(err) => {
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.hasError.set(err);
  //       },
  //     })
  // }
}
