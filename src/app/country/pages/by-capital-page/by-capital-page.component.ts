import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { TableListComponent } from "../../components/table-list/table-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, TableListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  private countryService = inject( CountryService );
  public isLoading = signal<boolean>(false);
  public hasError = signal<string|null>(null);
  public countries = signal<Country[]>([]);

  onSearch( query:string ){
    this.isLoading.set(true);
    this.hasError.set(null);
    this.countryService.searchByCapital(query)
      .subscribe((countries)=>{
        this.isLoading.set(false);
        this.countries.set(countries);
        console.log(countries);
      })
  }
}
