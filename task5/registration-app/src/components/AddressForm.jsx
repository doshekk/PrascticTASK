import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressForm = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [optional, setOptional] = useState('');
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryList = response.data.map(country => ({
          name: country.name.common,
          code: country.cca2,
        }));
        countryList.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async (countryCode) => {
      if (!countryCode) return;
      setLoading(true);
      try {
        const countryObj = countries.find(c => c.code === countryCode);
        if (!countryObj) {
          throw new Error("Country not found");
        }
        const response = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", {
          country: countryObj.name
        });
        if (response.data.error) {
          console.error("API error:", response.data.msg);
          setCities([]);
        } else {
          setCities(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    if (country) {
      fetchCities(country);
    }
  }, [country, countries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { address, city, country, zip, optional };
    console.log("Submitted data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Profile Info</h1>
      <p className="form-description">
        Fill in the data for profile. It will take a couple of minutes. <br />
        You only need a passport.
      </p>

      <h2>Delivery Address</h2>
      <p className="form-description">Used for shipping orders</p>

      <input 
        type="text" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        placeholder="Enter your address" 
        required 
      />

      <select value={city} onChange={(e) => setCity(e.target.value)} required>
        <option value="">Select City</option>
        {cities.length > 0 
          ? cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))
          : <option value="">Loading cities...</option>}
      </select>
            
      <div className="address-row" style={{ display: 'flex', gap: '20px', marginTop: '10px', marginBottom: '10px' }}>
        <select 
          value={country} 
          onChange={(e) => setCountry(e.target.value)} 
          required 
          style={{ flex: 1 }}  
        >
          <option value="">Select Country</option>
          {countries.map((c, index) => (
            <option key={index} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
        <input 
          type="text" 
          value={zip} 
          onChange={(e) => setZip(e.target.value)} 
          placeholder="Enter ZIP code" 
          required 
          style={{ flex: 1 }} 
        />
      </div>

      <div style={{ marginTop: '10px', fontSize: '14px', color: 'gray' }}>
        <label htmlFor="optional-text">Optional</label>
        <input 
          type="text" 
          id="optional-text" 
          value={optional} 
          onChange={(e) => setOptional(e.target.value)} 
          placeholder="Enter optional information" 
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddressForm;
