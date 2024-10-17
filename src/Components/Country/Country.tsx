import { ICountry } from '../../types';
import * as React from 'react';

interface IProps {
  country: ICountry;
  onClickCountry: React.MouseEventHandler<HTMLDivElement>;
}

const Country: React.FC<IProps> = React.memo(({country, onClickCountry}) => {
  return (
    <div style={{cursor: 'pointer'}} onClick={onClickCountry}>
      {country.name}
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.country.name === nextProps.country.name && prevProps.country.alpha3Code === nextProps.country.alpha3Code;
});

export default Country;