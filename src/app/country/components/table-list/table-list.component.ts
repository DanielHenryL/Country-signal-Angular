import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interfaces';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-table-list',
  imports: [DecimalPipe],
  templateUrl: './table-list.component.html',
})
export class TableListComponent {
  countries = input.required<Country[]>();
}
