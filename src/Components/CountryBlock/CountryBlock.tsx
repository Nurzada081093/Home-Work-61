import { useEffect, useState } from 'react';
import * as React from 'react';
import axios from 'axios';
import { ICountryInfo } from '../../types';
import { COUNTRY_CODE_URL } from '../../Constants.ts';

interface IProps {
  code: string;
}

const CountryBlock: React.FC<IProps> = ({code}) => {
  const [countryInfo, setCountryInfo] = useState<ICountryInfo | null>(null);

  useEffect(() => {
    const getPostById = async () => {

      try {
        const country: {data: ICountryInfo, status: number} = await axios.get<ICountryInfo>(COUNTRY_CODE_URL + code);
        setCountryInfo(country.data);
      } catch (e) {
        alert(e);
      }
    };

    if (code !== null) {
      void getPostById();
    }
  }, [code]);

  console.log(countryInfo);

  return (
    <>
      {countryInfo ?
        <div className="border border-black p-4 mt-4 mb-4">
          <h3>{countryInfo.name}</h3>
          <p>{}</p>
        </div>
        :
        null
      }
    </>
  );
};

export default CountryBlock;