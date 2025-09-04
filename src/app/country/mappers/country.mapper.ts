import type { Country } from "../interfaces/country.interfaces";
import type { RestCountry } from "../interfaces/restcountries.interfaces";

export class CountryMapper {
  static mapperRestCountryToCountry (restCountry:RestCountry):Country {
    return {
      cca2:restCountry.cca2,
      flag:restCountry.flag,
      flagSvg:restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      capital:restCountry.capital.join(','),
      population:restCountry.population
    }
  }

  static mapperRestCountriesToCountries(RestCountries:RestCountry[]):Country[]{
    return RestCountries.map( (country) =>  this.mapperRestCountryToCountry(country) )
  }
}
