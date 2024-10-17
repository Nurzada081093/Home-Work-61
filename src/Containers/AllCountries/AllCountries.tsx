import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { ALL_COUNTRIES_URL } from '../../Constants.ts';
import { ICountry } from '../../types';
import Country from '../../Components/Country/Country.tsx';
import CountryBlock from '../../Components/CountryBlock/CountryBlock.tsx';


const AllCountries = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [countryClicked, setCountryClicked] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const countriesResponse = await axios.get<ICountry[]>(ALL_COUNTRIES_URL);
      setCountries((prevState) => [...prevState, ...countriesResponse.data]);
    } catch (e) {
      alert(e);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    <div className='container h-25 border border-black d-flex justify-content-between p-0'>
      <div className='w-25 border border-black ml-0'>
        {countries.length > 0 ?
          countries.map((country) => (
            <Country
              key={country.alpha3Code}
              country={country}
              onClickCountry={() => setCountryClicked(country.alpha3Code)}
            />
          ))
          :
          <div>Стран нет</div>
        }
      </div>
      <div className="w-75 text-center">
        {
          countryClicked !== null && (
            <CountryBlock code={countryClicked}/>
          )
        }
      </div>
    </div>
  );
};

export default AllCountries;
