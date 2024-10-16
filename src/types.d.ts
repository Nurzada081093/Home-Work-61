export interface ICountry {
  name: string;
  alpha3Code: string;
  independent: boolean;
  borders: IBorder[];
  capital: string;
  flag: string;
  population: number;
  region: string;
  subregion: string;
}

export interface IBorder {
  alpha3Code: string;
}

