import Country from './Country/Country.tsx';
import { ICountry } from '../../types';
import * as React from 'react';

interface IProps {
  countries: ICountry[];
}


const Countries: React.FC<IProps> = ({countries}) => {
  return (
    <>
      {countries.map((country) => (
        <Country key={country.alpha3Code} country={country}/>
      ))}
    </>
  );
};

export default Countries;