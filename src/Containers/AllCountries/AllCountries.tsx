import Countries from '../../Components/Countries/Countries.tsx';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { ALL_COUNTRIES_URL, COUNTRY_CODE_URL } from '../../Constants.ts';
import { ICountry } from '../../types';
import CountryBlock from '../../Components/CountryBlock/CountryBlock.tsx';


const AllCountries = () => {
  const [countries, setCountries] = useState([]);

  const fetchData = useCallback(async () => {
    const countries: {data: ICountry[], status: number} = await axios.get<ICountry[]>(ALL_COUNTRIES_URL);
    const countriesData = countries.data;

    const promises = countriesData.map(async (country) => {
      const responseCountry = await axios.get<ICountry[]>(COUNTRY_CODE_URL + country.alpha3Code);
      return responseCountry.data;
    });

    const allCountries = await Promise.all(promises);

    setCountries(allCountries);
  }, []);


  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  console.log(countries);

  return (
    <div className='container h-25 border border-black d-flex justify-content-between p-0'>
      <div className='w-25 border border-black ml-0'><Countries countries={countries}/></div>
      <div className="w-75 text-center"><CountryBlock/></div>

    </div>
  );
};

export default AllCountries;


