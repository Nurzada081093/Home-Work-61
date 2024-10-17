import { useEffect, useState } from 'react';
import * as React from 'react';
import axios from 'axios';
import { ICountryInfo } from '../../types';
import { COUNTRY_CODE_URL } from '../../Constants.ts';

interface IProps {
  code: string;
}

const CountryBlock: React.FC<IProps> = ({ code }) => {
  const [countryInfo, setCountryInfo] = useState<ICountryInfo | null>(null);
  const [borderCountries, setBorderCountries] = useState<ICountryInfo[]>([]);

  useEffect(() => {
    const getCountryInfo = async () => {
      try {
        const country: {data: ICountryInfo, status: number} = await axios.get<ICountryInfo>(COUNTRY_CODE_URL + code);
        const countryData = country.data;
        setCountryInfo(countryData);

        const borders = countryData.borders;

        if (!borders) {
          alert('Данная страна не имеет границ!');
          setBorderCountries([]);
        } else {
          const promises = borders.map(async (border) => {
            const borderCountry = await axios.get<ICountryInfo>(COUNTRY_CODE_URL + border);
            return borderCountry.data;
          });

          setBorderCountries(await Promise.all(promises));
        }
      } catch (e) {
        alert(e);
      }
    };

    if (code) {
      void getCountryInfo();
    }
  }, [code]);

  return (
    <>
      {countryInfo ? (
        <div className="border border-black p-4 ms-3 mb-5" >
          <h2 className="text-center text-uppercase">{countryInfo.name}</h2>
          <div className="card mb-3" style={{maxWidth: '800px'}}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={countryInfo.flag} className="m-2 img-fluid rounded-start" alt={countryInfo.name}/>
              </div>
              <div className="col-md-8">
                <div className="card-body ms-4">
                  <p className="card-text"><b>Capital:</b> {countryInfo.capital}</p>
                  <p className="card-text"><b>Region: </b>{countryInfo.region}</p>
                  <p className="card-text"><b>Subregion: </b>{countryInfo.subregion}</p>
                  <p className="card-text"><small className="text-muted">The country's population is {countryInfo.population}.</small></p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2">
            {borderCountries.length > 0 ? (
              <>
                <h3 className="text-center">Borders with:</h3>
                <div className="d-flex flex-wrap justify-content-around">
                  {borderCountries.map((border) => (
                    <div key={border.population} className="card mb-3" style={{width: "180px"}}>
                      <img style={{width: '180px', height: '120px'}} src={border.flag} className="card-img-top"
                           alt={border.name}/>
                      <div className="card-body">
                        <p className="card-text"><b>Name: </b>{border.name}</p>
                        <p className="card-text"><b>Capital: </b>{border.capital}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center mt-5 fst-italic fw-bold" style={{padding: '112px 0'}}>Данная страна не имеет границ!</div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CountryBlock;

