import { useEffect, useState } from 'react';
import countryServices from './services/countryAPI';

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};

const FilterForm = ({ value, handleChange }) => {
  return (
    <div>
      <label><b>Filter:</b></label>
      <Input value={value} handleChange={handleChange} />
    </div>
  );
};

const Input = ({ value, handleChange }) => {
  return (
    <div>
      <input value={value} onChange={handleChange} />
    </div>
  );
};

const Button = ({ type, text }) => {
  return (
    <button type={type}>{text}</button>
  );
};

const OneCountryDisplay = ({ country }) => {
  
  let name = country.name.common 
  let officialName = country.name.official
  let languages = country.languages
  let capital = country.capital[0]
  let timezones = country.timezones
  let phone = country.idd.root
  let region = country.region
  let population = country.population
  let currency = Object.values(country.currencies);

  return (
    <div>
      <h2>{name}</h2>
      <h3>{officialName}</h3>
      <h3>Capital: {capital}</h3>
      <img src={country.flags.png} alt={`${country.name.common} Flag`} />
      <h4>Region: {region}</h4>
      <h4>Languages:
        &nbsp;
        {Object.values(languages).map((lang, index) => (
          <span key={index}>{lang}&nbsp;</span>
        ))}
      </h4>
      <h4>Currency:
        &nbsp;
        {currency.map((currency,index) => (
          <span key={index}>{currency.name} {currency.symbol}</span>
        ))}
      </h4>
      <h4>Population: {population}</h4>
      <h4>Phone: {phone}</h4>
      <h4>Timezones:
        &nbsp;
        {timezones.map((zone, index) => (
          <span key={index}>| {zone} |</span>
        ))}
      </h4>
    </div>
  );
};

const ManyCountryDisplay = ({country}) => {
  const [show, setShow] = useState(false)

  let name = country.name.common
  let officialName = country.name.official
  let languages = country.languages
  let capital = country.capital[0]
  let timezones = country.timezones
  let phone = country.idd.root
  let region = country.region
  let population = country.population
  let currency = Object.values(country.currencies); 

  if(show){
    return (
      <div>
      <h2>{name}</h2>
      <h3>{officialName}</h3>
      <h3>Capital: {capital}</h3>
      <img src={country.flags.png} alt={`${country.name.common} Flag`} />
      <h4>Region: {region}</h4>
      <h4>Languages:
        &nbsp;
        {Object.values(languages).map((lang, index) => (
          <span key={index}>{lang}&nbsp;</span>
        ))}
      </h4>
      <h4>Currency:
        &nbsp;
        {currency.map((currency,index) => (
          <span key={index}>{currency.name} {currency.symbol}</span>
        ))}
      </h4>
      <h4>Population: {population}</h4>
      <h4>Phone: {phone}</h4>
      <h4>Timezones:
        &nbsp;
        {timezones.map((zone, index) => (
          <span key={index}>| {zone} |</span>
        ))}
      </h4>
      <button onClick={()=> setShow(prevShow => !prevShow)}>show less</button>
    </div>
    );
  }
  return(
    <div>
      <h2>{name}</h2>
      <img height="30" widht="30" src={country.flags.png} alt={`${country.name.common} Flag`} />
      <button onClick={()=> setShow(prevShow => !prevShow)}>show</button>
    </div>
  )
}


const AfterFilterForm = ({ filterCountries }) => {
  let filtered = [].concat(filterCountries);

  if (filtered.length === 1) {
    return (
      <OneCountryDisplay country={filtered[0]} />
    );
  }

  if (filtered.length < 10) {
    return (
      <>
        {filtered.map((country, index) => (
          <ManyCountryDisplay country={country} key={index} />
        ))}
      </>
    );
  }

  return(<></>)

};

function App() {
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState('');

  useEffect(() => {
    countryServices.getAll().then(initialResult => {
      setCountries(initialResult);
    });
  }, []);

  const handleNewCountryFilterChange = ({ target }) => {
    setFilterCountry(target.value);
  };

  const filterCountries = countries.filter(({ name }) =>
    name.common.toLowerCase().includes(filterCountry.toLowerCase())
  );

  return (
    <div>
      <Header text="Country Data" />
      <FilterForm value={filterCountry} handleChange={handleNewCountryFilterChange} />
      <AfterFilterForm filterCountries={filterCountries} />
    </div>
  );
}

export default App;
