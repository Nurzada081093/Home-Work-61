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
    <div className='container d-flex justify-content-between p-0'>
      <div className='w-25 border border-black m-2 p-2' style={{height: '570px', overflowY: 'auto', overflowX: 'hidden'}}>
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
      <div className="w-75 mt-2">
        {
          countryClicked !== null ? (
            <CountryBlock code={countryClicked}/>
          ) : (
            <div style={{border: '1px solid grey', textAlign: 'center', fontSize: '24px', fontStyle: 'italic', fontWeight: 600, marginLeft: '20px', padding: '265px 0'}}>Выберите страну из списка!</div>
          )
        }
      </div>
    </div>
  );
};

export default AllCountries;
