import { ICountry } from '../../../types';
import * as React from 'react';

interface IProps {
  country: ICountry;
}

const Country: React.FC<IProps> = ({country}) => {
  return (
    <div>
      {country.name}
    </div>
  );
};

export default Country;