import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { TableListComponent } from "../../components/table-list/table-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, TableListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  private countryService = inject( CountryService );

  query = signal('');

  countryResource = resource({
    request: () => ({query:this.query()}),
    loader: async({request}) => {
      if( !request.query ) return [];

      return await firstValueFrom(
        this.countryService.searchByCountry(request.query)
      )
    }
  })
}
