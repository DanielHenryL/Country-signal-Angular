import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { TableListComponent } from "../../components/table-list/table-list.component";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, TableListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  private countryService = inject( CountryService );

  query = signal('');

  countryResource = rxResource({
    request: () => ({query:this.query()}),
    loader: ({request}) => {
      if( !request.query ) return of([]);

      return this.countryService.searchByCountry(request.query)
    }
  })
}
