import React, { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setCountry(null);

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${input}`);
      if (!response.ok) {
        throw new Error('Country not found');
      }
      const data = await response.json();
      setCountry(data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrencies = (currencies) => {
    return currencies ? Object.values(currencies).map(currency => currency.name).join(', ') : 'N/A';
  };

  const formatLanguages = (languages) => {
    return languages ? Object.values(languages).join(', ') : 'N/A';
  };

  const matrixGreenStyle = { color: '#00ff00' };

  return (
    <div className="bg-black min-h-screen p-4">
      <div className="flex p-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={matrixGreenStyle}
          className="bg-black p-2"
          placeholder="Enter country name"
        />
        <button 
          onClick={handleSearch} 
          style={matrixGreenStyle}
          className="bg-black p-2 ml-2 hover:opacity-80"
        >
          Search
        </button>
      </div>

      {loading && <p style={matrixGreenStyle}>Loading...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {country && (
        <div className="p-4">
          <h2 className="text-xl" style={matrixGreenStyle}>{country.name.common}</h2>
          <p style={matrixGreenStyle}><strong>Capital:</strong> {country.capital}</p>
          <p style={matrixGreenStyle}><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p style={matrixGreenStyle}><strong>Region:</strong> {country.region}</p>
          <p style={matrixGreenStyle}><strong>Subregion:</strong> {country.subregion}</p>
          <p style={matrixGreenStyle}><strong>Languages:</strong> {formatLanguages(country.languages)}</p>
          <p style={matrixGreenStyle}><strong>Currencies:</strong> {formatCurrencies(country.currencies)}</p>
          <p>
            <strong style={matrixGreenStyle}>Map: </strong> 
            <a 
              href={`https://www.google.com/maps/place/${country.name.common}`} 
              target="_blank" 
              rel="noreferrer" 
              style={{ ...matrixGreenStyle, textDecoration: 'underline' }}
            >
              Google Maps
            </a>
          </p>
          <img 
            src={country.flags.png} 
            alt={`Flag of ${country.name.common}`} 
            className="max-w-xs mt-4" 
          />
        </div>
      )}
    </div>
  );
};

export default App;
