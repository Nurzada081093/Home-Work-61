export interface ICountry {
  alpha3Code: string;
  name: string;
}

export interface ICountryInfo {
  name: string;
  alpha3Code: string;
  independent: boolean;
  borders: string[];
  capital: string;
  flag: string;
  population: number;
  region: string;
  subregion: string;
}


